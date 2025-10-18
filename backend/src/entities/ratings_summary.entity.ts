import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('ratings_summary')
export class RatingsSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  worker_id: number;

  @Column({ type: 'int', default: 0 })
  total_reviews: number;

  @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
  avg_rating: number;

  @CreateDateColumn()
  last_update: Date;
}
