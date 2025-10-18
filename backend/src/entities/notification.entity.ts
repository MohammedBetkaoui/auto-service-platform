import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

export enum NotificationType {
  ORDER = 'order',
  PAYMENT = 'payment',
  SYSTEM = 'system',
  REVIEW = 'review',
  MESSAGE = 'message',
}

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  sender_id: number;

  @Column({ type: 'int' })
  receiver_id: number;

  @Column({
    type: 'enum',
    enum: NotificationType,
  })
  type: NotificationType;

  @Column({ type: 'varchar', length: 150 })
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({
    type: 'enum',
    enum: ['unread', 'read'],
    default: 'unread',
  })
  status: 'unread' | 'read';

  @Column({
    type: 'enum',
    enum: ['normal', 'high', 'critical'],
    default: 'normal',
  })
  priority: 'normal' | 'high' | 'critical';

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'datetime', nullable: true })
  read_at: Date;

  @Column({ type: 'boolean', default: false })
  is_pushed: boolean;

  // Relations
  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
