import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Message } from './message.entity';
import { User } from './user.entity';

@Entity('conversations')
export class Conversation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  participant1_id: number;

  @Column({ type: 'int' })
  participant2_id: number;

  @Column({ type: 'text', nullable: true })
  last_message: string;

  @Column({ type: 'datetime', nullable: true })
  last_message_at: Date;

  @Column({ type: 'boolean', default: false })
  is_support_chat: boolean;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (m) => m.conversation)
  messages: Message[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'participant1_id' })
  participant1: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'participant2_id' })
  participant2: User;
}
