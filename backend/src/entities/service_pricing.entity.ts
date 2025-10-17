import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Service } from './service.entity';

@Entity('service_pricing')
export class ServicePricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  service_id: number;

  @Column({ type: 'enum', enum: ['car', 'truck', 'van', 'bike'] })
  vehicle_type: 'car' | 'truck' | 'van' | 'bike';

  @Column({ type: 'varchar', length: 100 })
  region: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Service, (s: any) => s.pricing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'service_id' })
  service: Service;
}
