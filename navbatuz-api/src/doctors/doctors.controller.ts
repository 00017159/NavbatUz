import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { DoctorsService } from './doctors.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @ApiOperation({ summary: 'Search doctors with filters and pagination' })
  @ApiQuery({ name: 'specialty', required: false })
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'minRating', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['rating', 'price', 'experience'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  async findAll(
    @Query('specialty') specialty?: string,
    @Query('search') search?: string,
    @Query('minRating') minRating?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.doctorsService.findAll({
      specialty,
      search,
      minRating: minRating ? parseFloat(minRating) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      sortBy,
      sortOrder,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });
  }

  @Get('specialties')
  @ApiOperation({ summary: 'Get all available specialties' })
  async getSpecialties() {
    return this.doctorsService.getSpecialties();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID with reviews and slots' })
  async findById(@Param('id') id: string) {
    const doctor = await this.doctorsService.findById(id);
    if (!doctor) throw new NotFoundException('Doctor not found');
    return doctor;
  }

  @Get(':id/slots')
  @ApiOperation({ summary: 'Get available time slots for a doctor on a date' })
  @ApiQuery({ name: 'date', required: true, description: 'YYYY-MM-DD' })
  async getSlots(@Param('id') id: string, @Query('date') date: string) {
    return this.doctorsService.getSlots(id, date);
  }
}
