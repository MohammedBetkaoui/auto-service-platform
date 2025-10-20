import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { Order } from './order.entity';
import { Review } from './review.entity';
import { Notification } from './notification.entity';

export enum UserRole {
  CLIENT = 'client',
  provider = 'provider',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  full_name: string;
    @Column({ type: 'varchar', length: 255, nullable: true })
    refresh_token?: string;
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
  })
  role: UserRole;

  @Column({ type: 'boolean', default: true })
  is_verified: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar_url?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city?: string;

  @Column({ type: 'float', nullable: true })
  latitude?: number;

  @Column({ type: 'float', nullable: true })
  longitude?: number;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'banned'],
    default: 'active',
  })
  status: 'active' | 'inactive' | 'banned';

  // For providers: availability flag
  @Column({ type: 'boolean', default: false })
  is_available: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Vehicle, (vehicle) => vehicle.user)
  vehicles: Vehicle[];

  @OneToMany(() => Order, (order) => order.client)
  clientOrders: Order[];

  @OneToMany(() => Order, (order) => order.provider)
  providerOrders: Order[];

  @OneToMany(() => Review, (review) => review.client)
  clientReviews: Review[];

  @OneToMany(() => Review, (review) => review.provider)
  providerReviews: Review[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
