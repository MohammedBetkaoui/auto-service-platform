import { Injectable, Inject, forwardRef, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);
  constructor(
    @InjectRepository(Notification) private notifRepo: Repository<Notification>,
  ) {}

  async send(dto: CreateNotificationDto) {
    const n = this.notifRepo.create({
      sender_id: dto.sender_id || null,
      receiver_id: dto.receiver_id,
      type: dto.type as any,
      title: dto.title,
      message: dto.message,
      link: dto.link || null,
      priority: (dto.priority as any) || 'normal',
      status: 'unread',
      is_pushed: false,
    } as any);

    const saved = await this.notifRepo.save(n);

    // Emit via gateway if available (we don't inject gateway here to avoid circular deps)
    try {
      const gw = (await import('./notifications.gateway')).NotificationsGateway;
      // In runtime you would inject gateway and call this.gateway.server.to(...)
      // Here we just log that we would emit
  this.logger.log(`Notification created for user ${ (saved as any).receiver_id }`);
    } catch (e) {
      this.logger.debug('NotificationsGateway dynamic import failed (expected in runtime DI)');
    }

    return saved;
  }

  async findForUser(userId: number) {
    return await this.notifRepo.find({ where: { receiver_id: userId } as any, order: { created_at: 'DESC' } as any });
  }

  async markRead(id: number) {
    const n = await this.notifRepo.findOne({ where: { id } as any });
    if (!n) return null;
    n.status = 'read' as any;
    n.read_at = new Date();
    return await this.notifRepo.save(n);
  }

  async markAllRead(userId: number) {
    await this.notifRepo.createQueryBuilder().update().set({ status: 'read', read_at: () => 'NOW()' }).where('receiver_id = :userId', { userId }).execute();
    return true;
  }

  async remove(id: number) {
    return await this.notifRepo.delete({ id } as any);
  }
}
