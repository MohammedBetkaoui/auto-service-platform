import { Controller, Post, Body, UseGuards, Get, Query, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PricingDto } from './dto/pricing.dto';

@Controller()
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/services')
  async create(@Body() dto: CreateServiceDto) {
    const s = await this.servicesService.create(dto);
    return { message: 'Service créé', service: s };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/services/:id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateServiceDto) {
    const s = await this.servicesService.update(id, dto);
    return { message: 'Service mis à jour', service: s };
  }

  @Get('services')
  async list(@Query('category') category?: string) {
    return await this.servicesService.listActive({ category });
  }

  @Get('services/:id/price')
  async getPrice(@Param('id', ParseIntPipe) id: number, @Query('vehicle_type') vehicle_type?: string, @Query('region') region?: string) {
    const price = await this.servicesService.getPrice(id, vehicle_type, region);
    return { service_id: id, price };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post('admin/services/:id/pricing')
  async addPricing(@Param('id', ParseIntPipe) id: number, @Body() dto: PricingDto) {
    const p = await this.servicesService.addPricing(id, dto);
    return { message: 'Pricing added', pricing: p };
  }
}
