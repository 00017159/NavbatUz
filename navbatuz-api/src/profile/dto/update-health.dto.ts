import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHealthDto {
  @ApiProperty({ required: false, example: 'O+' })
  @IsOptional()
  @IsString()
  bloodType?: string;

  @ApiProperty({ required: false, example: 75.5 })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ required: false, example: 72 })
  @IsOptional()
  @IsNumber()
  heartRate?: number;
}
