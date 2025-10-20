import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  ParseIntPipe,
  Get,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AssignproviderDto } from './dto/assign-provider.dto';

@Controller()
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // 1. Client creates order
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CLIENT)
  @Post('orders')
  async create(@Request() req, @Body() dto: CreateOrderDto) {
    const order = await this.ordersService.create(req.user.id, dto);
    return { message: 'Order created', order };
  }

  // provider accepts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.provider)
  @Patch('orders/:id/accept')
  async accept(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: AssignproviderDto) {
    const res = await this.ordersService.accept(req.user.id, id, dto);
    return { message: 'Order accepted', order: res };
  }

  // provider starts
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.provider)
  @Patch('orders/:id/start')
  async start(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const res = await this.ordersService.start(req.user.id, id);
    return { message: 'Order started', order: res };
  }

  // provider completes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.provider)
  @Patch('orders/:id/complete')
  async complete(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const res = await this.ordersService.complete(req.user.id, id);
    return { message: 'Order completed', order: res };
  }

  // Cancel by client/provider/admin
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('orders/:id/cancel')
  async cancel(@Request() req, @Param('id', ParseIntPipe) id: number) {
    const role = req.user.role;
    const res = await this.ordersService.cancel(req.user.id, id, role);
    return { message: 'Order cancelled', order: res };
  }

  // Admin endpoints
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/orders')
  async adminList() {
    // For brevity: return all orders — filters can be added
    return { message: 'Not implemented: admin list' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/orders/:id')
  async adminGet(@Param('id', ParseIntPipe) id: number) {
    const o = await this.ordersService.findOne(id);
    return o;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/orders/:id/status')
  async adminUpdateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const updated = await this.ordersService.findOne(id);
    // simplistic: set status
    updated.status = body.status;
    return { message: 'Status updated', order: await this.ordersService.findOne(id) };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/orders/:id')
  async adminDelete(@Param('id', ParseIntPipe) id: number) {
    // for safety, do a soft-delete or archive in production
    // here we simply delete
    const o = await this.ordersService.findOne(id);
    await this.ordersService.cancel(0, id, 'admin');
    return { message: 'Order archived/deleted' };
  }
}
