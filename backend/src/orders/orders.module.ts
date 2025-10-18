import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { OrderTracking } from '../entities/order_tracking.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersGateway } from './gateways/orders.gateway';
import { UsersModule } from '../users/users.module';
import { ServicesModule } from '../services/services.module';
import { VehiclesModule } from '../vehicles/vehicles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderTracking]),
    UsersModule,
    ServicesModule,
    VehiclesModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersGateway],
  exports: [OrdersService],
})
export class OrdersModule {}
