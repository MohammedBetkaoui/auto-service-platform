import { Controller, Post, Body, UseGuards, Request, Get, Query, Param, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class ChatController {
  constructor(private chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Post('conversations')
  async createConversation(@Request() req, @Body() dto: CreateConversationDto) {
    return await this.chatService.createConversation(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversations')
  async listConversations(@Request() req) {
    // TODO: add pagination and filters
    return await this.chatService['convRepo'].find({ where: [{ participant1_id: req.user.id }, { participant2_id: req.user.id }] } as any);
  }

  @UseGuards(JwtAuthGuard)
  @Get('conversations/:id/messages')
  async getMessages(@Param('id', ParseIntPipe) id: number, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return await this.chatService.getMessages(id, Number(limit) || 50, Number(offset) || 0);
  }

  @UseGuards(JwtAuthGuard)
  @Post('conversations/:id/messages')
  async sendMessage(@Request() req, @Param('id', ParseIntPipe) id: number, @Body() dto: SendMessageDto) {
    return await this.chatService.sendMessage(req.user.id, { ...dto, conversation_id: id });
  }
}
