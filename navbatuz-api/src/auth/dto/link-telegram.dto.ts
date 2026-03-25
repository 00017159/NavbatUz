import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LinkTelegramDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  chatId: string;
}
