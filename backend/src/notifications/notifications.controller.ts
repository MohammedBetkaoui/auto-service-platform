import { Controller, Get, UseGuards, Request, Patch, Param, ParseIntPipe, Delete, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('notifications')
  async list(@Request() req) {
    return await this.notificationsService.findForUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('notifications/:id/read')
  async markRead(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationsService.markRead(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('notifications/mark-all-read')
  async markAllRead(@Request() req) {
    return await this.notificationsService.markAllRead(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('notifications/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.notificationsService.remove(id as number);
  }
}
