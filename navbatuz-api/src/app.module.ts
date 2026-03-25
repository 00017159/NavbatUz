import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TelegramModule } from './telegram/telegram.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({ isGlobal: true }),

    // Rate Limiting
    ThrottlerModule.forRoot([
      {
        name: 'default',
        ttl: 60000,
        limit: 20,
      },
    ]),

    // Core modules
    PrismaModule,
    TelegramModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
