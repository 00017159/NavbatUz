import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);

  constructor(private configService: ConfigService) {
    const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (token) {
      this.bot = new TelegramBot(token, { polling: false });
      this.logger.log('Telegram bot initialized');
    } else {
      this.logger.warn('TELEGRAM_BOT_TOKEN not set — OTP via Telegram disabled');
    }
  }

  async sendVerificationCode(chatId: string, code: string): Promise<boolean> {
    if (!this.bot) {
      this.logger.warn('Telegram bot not initialized, cannot send OTP');
      return false;
    }

    try {
      const message = `🔐 *NavbatUz Verification Code*\n\nYour code: *${code}*\n\nThis code expires in 5 minutes.\nDo not share it with anyone.`;
      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      this.logger.log(`OTP sent to Telegram chatId: ${chatId}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send OTP to chatId ${chatId}:`, error);
      return false;
    }
  }

  async sendAppointmentNotification(
    chatId: string,
    doctorName: string,
    date: string,
    time: string,
  ): Promise<boolean> {
    if (!this.bot) return false;

    try {
      const message = `📅 *Appointment Confirmed*\n\nDoctor: ${doctorName}\nDate: ${date}\nTime: ${time}\n\nOpen NavbatUz app for details.`;
      await this.bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
      return true;
    } catch (error) {
      this.logger.error(`Failed to send notification to chatId ${chatId}:`, error);
      return false;
    }
  }
}
