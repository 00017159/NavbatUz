import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: {
    specialty?: string;
    search?: string;
    minRating?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const {
      specialty,
      search,
      minRating,
      maxPrice,
      sortBy = 'rating',
      sortOrder = 'desc',
      page = 1,
      limit = 10,
    } = query;

    const where: Prisma.DoctorWhereInput = {
      isAvailable: true,
      ...(specialty && { specialty: specialty as any }),
      ...(minRating && { rating: { gte: minRating } }),
      ...(maxPrice && { pricePerVisit: { lte: maxPrice } }),
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { clinicName: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const orderBy: Prisma.DoctorOrderByWithRelationInput = {
      [sortBy]: sortOrder,
    };

    const [data, total] = await Promise.all([
      this.prisma.doctor.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          reviews: {
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
        },
      }),
      this.prisma.doctor.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string) {
    return this.prisma.doctor.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { patient: { select: { fullName: true, avatarUrl: true } } },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        timeSlots: {
          where: { isBooked: false },
          orderBy: { startTime: 'asc' },
        },
      },
    });
  }

  async getSpecialties() {
    const specialties = await this.prisma.doctor.findMany({
      select: { specialty: true },
      distinct: ['specialty'],
    });
    return specialties.map((s) => s.specialty);
  }

  async getSlots(doctorId: string, date: string) {
    const dayOfWeek = new Date(date).getDay();

    return this.prisma.timeSlot.findMany({
      where: {
        doctorId,
        dayOfWeek,
        isBooked: false,
      },
      orderBy: { startTime: 'asc' },
    });
  }
}
