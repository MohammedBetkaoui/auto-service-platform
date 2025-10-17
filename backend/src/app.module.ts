import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Service } from './entities/service.entity';
import { Order } from './entities/order.entity';
import { Payment } from './entities/payment.entity';
import { Review } from './entities/review.entity';
import { Notification } from './entities/notification.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    // Configuration globale
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuration TypeORM
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'auto_service_platform',
      entities: [User, Vehicle, Service, Order, Payment, Review, Notification],
      synchronize: false, // IMPORTANT: Ne pas utiliser en production
      logging: process.env.NODE_ENV === 'development',
    }),

    // Modules de l'application
    AuthModule,
    UsersModule,
  VehiclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
