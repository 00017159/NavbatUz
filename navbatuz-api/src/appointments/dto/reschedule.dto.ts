import { IsString, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RescheduleDto {
  @ApiProperty({ required: false, example: '2026-04-05' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ required: false, example: '02:00 PM' })
  @IsOptional()
  @IsString()
  time?: string;

  @ApiProperty({ required: false, example: 'CANCELLED' })
  @IsOptional()
  @IsString()
  status?: string;
}
