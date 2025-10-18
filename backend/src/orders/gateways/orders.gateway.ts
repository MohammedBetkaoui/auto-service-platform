import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/orders', cors: { origin: '*' } })
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    // TODO: auth handshake validation
  }

  handleDisconnect(client: Socket) {}

  @SubscribeMessage('location:update')
  handleLocationUpdate(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    // data: { order_id, latitude, longitude }
    this.server.to(`order_${data.order_id}`).emit('location:update', data);
  }

  @SubscribeMessage('status:update')
  handleStatusUpdate(@MessageBody() data: any) {
    this.server.to(`order_${data.order_id}`).emit('status:update', data);
  }
}
