import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('order_tracking')
export class OrderTracking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  order_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 8 })
  latitude: number;

  @Column({ type: 'decimal', precision: 11, scale: 8 })
  longitude: number;

  @CreateDateColumn()
  timestamp: Date;
}
