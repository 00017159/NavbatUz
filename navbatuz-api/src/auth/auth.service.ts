import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private telegramService: TelegramService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: dto.email }, { phone: dto.phone }],
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email or phone already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        phone: dto.phone,
        passwordHash,
        telegramChatId: dto.telegramChatId || null,
      },
    });

    // Generate and send OTP
    await this.generateAndSendOtp(user.phone, user.telegramChatId);

    return {
      message: 'Registration successful. OTP sent to your Telegram.',
      userId: user.id,
    };
  }

  async login(dto: LoginDto) {
    // Find user by email or phone
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.emailOrPhone },
          { phone: dto.emailOrPhone },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate and send OTP for 2FA
    await this.generateAndSendOtp(user.phone, user.telegramChatId);

    return {
      message: 'OTP sent to your Telegram for verification.',
    };
  }

  async generateAndSendOtp(phone: string, telegramChatId?: string): Promise<string> {
    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Invalidate previous OTPs for this phone
    await this.prisma.otpVerification.updateMany({
      where: { phone, verified: false },
      data: { verified: true },
    });

    // Store OTP in database
    await this.prisma.otpVerification.create({
      data: { phone, code, expiresAt },
    });

    // Send via Telegram if chatId is available
    if (telegramChatId) {
      await this.telegramService.sendVerificationCode(telegramChatId, code);
    }

    return code;
  }

  async verifyOtp(phone: string, code: string) {
    // Find the latest unverified OTP for this phone
    const otp = await this.prisma.otpVerification.findFirst({
      where: {
        phone,
        code,
        verified: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp) {
      throw new BadRequestException('Invalid or expired OTP code');
    }

    // Mark OTP as verified
    await this.prisma.otpVerification.update({
      where: { id: otp.id },
      data: { verified: true },
    });

    // Find user
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    return {
      ...tokens,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl,
        bloodType: user.bloodType,
        weight: user.weight,
        heartRate: user.heartRate,
      },
    };
  }

  async sendOtp(phone: string) {
    const user = await this.prisma.user.findUnique({ where: { phone } });
    if (!user) {
      throw new BadRequestException('No account found with this phone number');
    }

    await this.generateAndSendOtp(phone, user.telegramChatId);

    return { message: 'OTP sent to your Telegram.' };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const tokens = await this.generateTokens(
        payload.sub,
        payload.email,
        payload.role,
      );

      return { accessToken: tokens.accessToken };
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async linkTelegram(userId: string, chatId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { telegramChatId: chatId },
    });

    return { message: 'Telegram account linked successfully.' };
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const payload = { sub: userId, email, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION', '7d'),
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
