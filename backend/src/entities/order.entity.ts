import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Service } from './service.entity';
import { Vehicle } from './vehicle.entity';
import { Payment } from './payment.entity';
import { Review } from './review.entity';

export enum OrderStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  client_id: number;

  @Column({ type: 'int', nullable: true })
  worker_id: number;

  @Column({ type: 'int' })
  service_id: number;

  @Column({ type: 'int', nullable: true })
  vehicle_id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'varchar', length: 255 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  region: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitude: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'datetime', nullable: true })
  start_time: Date;

  @Column({ type: 'datetime', nullable: true })
  end_time: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.clientOrders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'client_id' })
  client: User;

  @ManyToOne(() => User, (user) => user.workerOrders, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'worker_id' })
  worker: User;

  @ManyToOne(() => Service, (service) => service.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.orders, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'vehicle_id' })
  vehicle: Vehicle;

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];

  @OneToOne(() => Review, (review) => review.order)
  review: Review;
}
