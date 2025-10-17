import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Order } from './order.entity';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  user_id: number;

  @Column({ type: 'varchar', length: 50 })
  brand: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'varchar', length: 20 })
  license_plate: string;

  @Column({
    type: 'enum',
    enum: ['car', 'truck', 'van', 'bike'],
    default: 'car',
  })
  type: 'car' | 'truck' | 'van' | 'bike';

  @Column({ type: 'varchar', length: 50, nullable: true })
  capacity?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color?: string;

  @Column({ type: 'int', nullable: true })
  year?: number;

  @Column({ type: 'boolean', default: true })
  is_available: boolean;

  @Column({
    type: 'enum',
    enum: ['approved', 'pending', 'rejected'],
    default: 'pending',
  })
  status: 'approved' | 'pending' | 'rejected';

  @Column({ type: 'varchar', length: 255, nullable: true })
  documents_url?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.vehicles, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Order, (order) => order.vehicle)
  orders: Order[];
}
