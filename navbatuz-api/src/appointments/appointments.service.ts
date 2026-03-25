import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async book(patientId: string, dto: CreateAppointmentDto) {
    // ACID Transaction: check slot → create appointment → mark slot booked
    return this.prisma.$transaction(async (tx) => {
      // Check if doctor exists
      const doctor = await tx.doctor.findUnique({
        where: { id: dto.doctorId },
      });
      if (!doctor) throw new NotFoundException('Doctor not found');

      // Check for double booking
      const existingAppointment = await tx.appointment.findFirst({
        where: {
          doctorId: dto.doctorId,
          date: new Date(dto.date),
          time: dto.time,
          status: { in: ['PENDING', 'CONFIRMED'] },
        },
      });
      if (existingAppointment) {
        throw new BadRequestException('This time slot is already booked');
      }

      // Mark time slot as booked
      const dayOfWeek = new Date(dto.date).getDay();
      await tx.timeSlot.updateMany({
        where: {
          doctorId: dto.doctorId,
          dayOfWeek,
          startTime: dto.time,
          isBooked: false,
        },
        data: { isBooked: true },
      });

      // Create appointment
      const appointment = await tx.appointment.create({
        data: {
          patientId,
          doctorId: dto.doctorId,
          date: new Date(dto.date),
          time: dto.time,
          reason: dto.reason,
        },
        include: {
          doctor: true,
          patient: {
            select: { fullName: true, email: true, phone: true },
          },
        },
      });

      return appointment;
    });
  }

  async getMyAppointments(patientId: string, status?: string) {
    const now = new Date();

    let where: any = { patientId };

    if (status === 'upcoming') {
      where = {
        ...where,
        date: { gte: now },
        status: { in: ['PENDING', 'CONFIRMED'] },
      };
    } else if (status === 'past') {
      where = {
        ...where,
        OR: [
          { date: { lt: now } },
          { status: { in: ['COMPLETED', 'CANCELLED'] } },
        ],
      };
    }

    return this.prisma.appointment.findMany({
      where,
      include: {
        doctor: {
          select: {
            fullName: true,
            specialty: true,
            avatarUrl: true,
            clinicName: true,
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async getById(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: { doctor: true, patient: true },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    return appointment;
  }

  async reschedule(id: string, patientId: string, date: string, time: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.patientId !== patientId) {
      throw new ForbiddenException('Not your appointment');
    }
    if (appointment.status === 'CANCELLED' || appointment.status === 'COMPLETED') {
      throw new BadRequestException('Cannot reschedule this appointment');
    }

    return this.prisma.appointment.update({
      where: { id },
      data: { date: new Date(date), time },
      include: { doctor: true },
    });
  }

  async cancel(id: string, patientId: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });
    if (!appointment) throw new NotFoundException('Appointment not found');
    if (appointment.patientId !== patientId) {
      throw new ForbiddenException('Not your appointment');
    }

    // Free the time slot
    const dayOfWeek = appointment.date.getDay();
    await this.prisma.timeSlot.updateMany({
      where: {
        doctorId: appointment.doctorId,
        dayOfWeek,
        startTime: appointment.time,
      },
      data: { isBooked: false },
    });

    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: { doctor: true },
    });
  }

  async confirm(id: string) {
    return this.prisma.appointment.update({
      where: { id },
      data: { status: 'CONFIRMED' },
      include: { doctor: true, patient: true },
    });
  }
}
