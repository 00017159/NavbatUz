import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateHealthDto } from './dto/update-health.dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        bloodType: true,
        weight: true,
        heartRate: true,
        avatarUrl: true,
        telegramChatId: true,
        isActive: true,
        createdAt: true,
        _count: { select: { appointments: true, reviews: true, medicalRecords: true } },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
      },
      select: {
        id: true, fullName: true, email: true, phone: true,
        role: true, avatarUrl: true, bloodType: true, weight: true, heartRate: true,
      },
    });
  }

  async updateHealthStats(userId: string, dto: UpdateHealthDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        bloodType: dto.bloodType,
        weight: dto.weight,
        heartRate: dto.heartRate,
      },
    });
  }

  async getMedicalRecords(userId: string) {
    return this.prisma.medicalRecord.findMany({
      where: { patientId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getMyReviews(userId: string) {
    return this.prisma.review.findMany({
      where: { patientId: userId },
      include: {
        doctor: { select: { fullName: true, specialty: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
