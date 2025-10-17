import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { ServicePricing } from './service_pricing.entity';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: ['wash', 'oil_change', 'repair', 'towing', 'battery', 'other'],
    default: 'other',
  })
  category: 'wash' | 'oil_change' | 'repair' | 'towing' | 'battery' | 'other';

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  base_price: number;

  @Column({
    type: 'enum',
    enum: ['vehicle', 'hour', 'distance'],
    default: 'vehicle',
  })
  unit: 'vehicle' | 'hour' | 'distance';

  @Column({ type: 'varchar', length: 50, nullable: true })
  duration_estimate?: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @OneToMany(() => Order, (order) => order.service)
  orders: Order[];

  @OneToMany(() => ServicePricing, (p) => p.service)
  pricing: ServicePricing[];
}
