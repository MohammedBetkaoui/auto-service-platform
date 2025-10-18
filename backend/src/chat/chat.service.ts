import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../entities/conversation.entity';
import { Message } from '../entities/message.entity';
import { Attachment } from '../entities/attachment.entity';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);
  constructor(
    @InjectRepository(Conversation) private convRepo: Repository<Conversation>,
    @InjectRepository(Message) private msgRepo: Repository<Message>,
    @InjectRepository(Attachment) private attRepo: Repository<Attachment>,
  ) {}

  async createConversation(dto: CreateConversationDto) {
    // prevent duplicate 1:1 convs by ordering participant ids
    const p1 = dto.participant1_id;
    const p2 = dto.participant2_id;
    const existing = await this.convRepo.findOne({ where: [{ participant1_id: p1, participant2_id: p2 }, { participant1_id: p2, participant2_id: p1 }] } as any);
    if (existing) return existing;
    const c = this.convRepo.create(dto as any);
    return await this.convRepo.save(c);
  }

  async sendMessage(senderId: number, dto: SendMessageDto) {
    const conv = await this.convRepo.findOne({ where: { id: dto.conversation_id } as any });
    if (!conv) throw new NotFoundException('Conversation not found');

    const m = this.msgRepo.create({ conversation_id: dto.conversation_id, sender_id: senderId, message: dto.message, type: dto.type, attachment_url: dto.attachment_url } as any);
    const saved = await this.msgRepo.save(m);

    // update conversation last_message
    conv.last_message = dto.message || null;
    conv.last_message_at = new Date();
    await this.convRepo.save(conv);

    return saved;
  }

  async markSeen(userId: number, conversationId: number) {
    const messages = await this.msgRepo.find({ where: { conversation_id: conversationId, is_seen: false } as any });
    for (const m of messages) {
      if (m.sender_id !== userId) {
        m.is_seen = true;
        await this.msgRepo.save(m);
      }
    }
    return true;
  }

  async getMessages(conversationId: number, limit = 50, offset = 0) {
    return await this.msgRepo.find({ where: { conversation_id: conversationId } as any, order: { created_at: 'DESC' } as any, take: limit, skip: offset });
  }
}
