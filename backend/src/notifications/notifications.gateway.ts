import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationsService } from './notifications.service';

@WebSocketGateway({ namespace: '/notifications', cors: { origin: '*' } })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private notificationsService: NotificationsService) {}

  async handleConnection(client: Socket) {
    // Expect token in query or an initial 'register' event
    // Prefill if provided
    const token = client.handshake.auth?.token || client.handshake.query?.token;
    // TODO: validate token and join room user_{id}
  }

  handleDisconnect(client: Socket) {
    // clean-up
  }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // data: { userId }
    if (data?.userId) {
      client.join(`user_${data.userId}`);
    }
  }
}
