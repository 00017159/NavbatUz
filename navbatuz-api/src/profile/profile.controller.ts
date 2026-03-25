import {
  Controller, Get, Patch, Put, Body, UseGuards, Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateHealthDto } from './dto/update-health.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @ApiOperation({ summary: 'Get current user profile' })
  async getProfile(@Request() req) {
    return this.profileService.getProfile(req.user.userId);
  }

  @Patch()
  @ApiOperation({ summary: 'Update profile info' })
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.profileService.updateProfile(req.user.userId, dto);
  }

  @Put('health-stats')
  @ApiOperation({ summary: 'Update health statistics' })
  async updateHealthStats(@Request() req, @Body() dto: UpdateHealthDto) {
    return this.profileService.updateHealthStats(req.user.userId, dto);
  }

  @Get('medical-records')
  @ApiOperation({ summary: 'Get medical records' })
  async getMedicalRecords(@Request() req) {
    return this.profileService.getMedicalRecords(req.user.userId);
  }

  @Get('reviews')
  @ApiOperation({ summary: 'Get my reviews' })
  async getMyReviews(@Request() req) {
    return this.profileService.getMyReviews(req.user.userId);
  }
}
