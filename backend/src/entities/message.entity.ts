import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';
import { Attachment } from './attachment.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  conversation_id: number;

  @Column({ type: 'int' })
  sender_id: number;

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  attachment_url: string;

  @Column({ type: 'enum', enum: ['text', 'image', 'file', 'audio'], default: 'text' as any })
  type: 'text' | 'image' | 'file' | 'audio';

  @Column({ type: 'boolean', default: false })
  is_seen: boolean;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Conversation, (c) => c.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'conversation_id' })
  conversation: Conversation;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @OneToMany(() => Attachment, (a) => a.message)
  attachments: Attachment[];
}
