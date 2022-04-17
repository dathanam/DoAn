import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class AppGateway{

  // @WebSocketServer() server: Server;
  // private logger: Logger = new Logger('AppGateway');

  // @SubscribeMessage('message')
  // handleMessage(client: Socket, payload: string): void {
  //   this.server.emit('message', payload);
  // }

  // afterInit(server: Server) {
  //   this.logger.log('Init');
  // }

  // handleDisconnect(client: Socket) {
  //   this.logger.log(`Client disconnected: ${client.id}`);
  // }

  // handleConnection(client: Socket, ...args: any[]) {
  //   this.logger.log(`Client connected: ${client.id}`);
  // }
}
