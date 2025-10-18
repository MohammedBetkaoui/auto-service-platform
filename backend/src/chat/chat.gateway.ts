import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ namespace: '/chat', cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    // TODO: validate JWT from client.handshake.auth.token and join rooms
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    if (data?.userId) client.join(`user_${data.userId}`);
  }

  @SubscribeMessage('message:new')
  async handleNewMessage(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // expect data: { senderId, conversation_id, message, attachment_url, type }
    const saved = await this.chatService.sendMessage(data.senderId, data);
    // emit to conversation room
    this.server.to(`conversation_${data.conversation_id}`).emit('message:new', saved);
    // emit a notification to the other participant(s)
    // TODO: integrate with NotificationsService
    return saved;
  }

  @SubscribeMessage('message:seen')
  async handleSeen(@MessageBody() data: any) {
    // data: { userId, conversationId }
    await this.chatService.markSeen(data.userId, data.conversationId);
    this.server.to(`conversation_${data.conversationId}`).emit('message:seen', { conversationId: data.conversationId });
  }
}
