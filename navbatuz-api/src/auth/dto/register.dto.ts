import { IsEmail, IsString, MinLength, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Alex Thompson' })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({ example: 'alex@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998901234567' })
  @IsString()
  @Matches(/^\+998[0-9]{9}$/, { message: 'Phone must be in Uzbekistan format: +998XXXXXXXXX' })
  phone: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ required: false, example: '123456789' })
  @IsOptional()
  @IsString()
  telegramChatId?: string;
}
