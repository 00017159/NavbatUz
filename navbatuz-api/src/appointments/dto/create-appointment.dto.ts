import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'uuid-of-doctor' })
  @IsString()
  doctorId: string;

  @ApiProperty({ example: '2026-04-01' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '10:30 AM' })
  @IsString()
  time: string;

  @ApiProperty({ required: false, example: 'Chest pain and shortness of breath' })
  @IsOptional()
  @IsString()
  reason?: string;
}
