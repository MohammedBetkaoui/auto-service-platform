import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { VehiclesService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleStatusDto } from './dto/update-status.dto';

@Controller()
export class VehiclesController {
  constructor(private vehiclesService: VehiclesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Post('vehicles')
  async create(@Request() req, @Body() dto: CreateVehicleDto) {
    const userId = req.user.id;
    const vehicle = await this.vehiclesService.create(userId, dto);
    return { message: 'Véhicule ajouté', vehicle };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Get('vehicles/my')
  async myVehicles(@Request() req) {
    const userId = req.user.id;
    return await this.vehiclesService.findMy(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/vehicles')
  async adminList() {
    return await this.vehiclesService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Patch('vehicles/:id')
  async update(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleDto) {
    const userId = req.user.id;
    const updated = await this.vehiclesService.update(userId, id, dto);
    return { message: 'Véhicule mis à jour', vehicle: updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Patch('vehicles/:id/status')
  async updateStatus(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVehicleStatusDto) {
    const userId = req.user.id;
    const updated = await this.vehiclesService.updateStatus(userId, id, dto.is_available);
    return { message: 'Disponibilité mise à jour', vehicle: updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Delete('vehicles/:id')
  async remove(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const userId = req.user.id;
    await this.vehiclesService.remove(userId, id);
    return { message: 'Véhicule supprimé' };
  }

  // Admin actions
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/vehicles/:id/approve')
  async approve(@Param('id', ParseIntPipe) id: number, @Body() body: { status: 'approved' | 'rejected' }) {
    const updated = await this.vehiclesService.approve(id, body.status);
    return { message: 'Statut mis à jour', vehicle: updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/vehicles/:id')
  async adminRemove(@Param('id', ParseIntPipe) id: number) {
    // For admin remove, we pass a special userId (0) and bypass ownership check in service if needed
    await this.vehiclesService.remove(0, id);
    return { message: 'Véhicule supprimé par admin' };
  }
}
