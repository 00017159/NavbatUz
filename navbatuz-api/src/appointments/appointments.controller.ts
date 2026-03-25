import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RescheduleDto } from './dto/reschedule.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Book a new appointment (ACID transaction)' })
  async book(@Request() req, @Body() dto: CreateAppointmentDto) {
    return this.appointmentsService.book(req.user.userId, dto);
  }

  @Get('my')
  @ApiOperation({ summary: 'Get my appointments (upcoming/past)' })
  @ApiQuery({ name: 'status', required: false, enum: ['upcoming', 'past'] })
  async getMyAppointments(@Request() req, @Query('status') status?: string) {
    return this.appointmentsService.getMyAppointments(req.user.userId, status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get appointment details' })
  async getById(@Param('id') id: string) {
    return this.appointmentsService.getById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Reschedule or cancel appointment' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: RescheduleDto,
  ) {
    if (dto.status === 'CANCELLED') {
      return this.appointmentsService.cancel(id, req.user.userId);
    }
    return this.appointmentsService.reschedule(
      id,
      req.user.userId,
      dto.date,
      dto.time,
    );
  }

  @Post(':id/confirm')
  @ApiOperation({ summary: 'Doctor confirms appointment' })
  async confirm(@Param('id') id: string) {
    return this.appointmentsService.confirm(id);
  }
}
