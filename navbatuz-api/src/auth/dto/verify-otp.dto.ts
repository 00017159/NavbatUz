import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
  @ApiProperty({ example: '+998901234567' })
  @IsString()
  phone: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @Length(6, 6)
  code: string;
}
