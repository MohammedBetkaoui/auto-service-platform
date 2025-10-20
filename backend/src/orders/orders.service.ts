import { Injectable, NotFoundException, BadRequestException, ForbiddenException, ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Order, OrderStatus } from '../entities/order.entity';
import { OrderTracking } from '../entities/order_tracking.entity';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { AssignproviderDto } from './dto/assign-provider.dto';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';
import { VehiclesService } from '../vehicles/vehicles.service';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);
  constructor(
    @InjectRepository(Order)
    private ordersRepo: Repository<Order>,
    @InjectRepository(OrderTracking)
    private trackingRepo: Repository<OrderTracking>,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private vehiclesService: VehiclesService,
    private dataSource: DataSource,
  ) {}

  // Create a new order: validate service, compute price, notify providers
  async create(clientId: number, dto: CreateOrderDto): Promise<Order> {
    const svc = await this.servicesService.getPrice(dto.service_id, dto.vehicle_type, dto.region);
    const price = Number(svc);

    // Optional: better price calculation via pricing service
    const order = this.ordersRepo.create({
      client_id: clientId,
      service_id: dto.service_id,
      location: dto.address,
      region: dto.region,
      latitude: dto.latitude,
      longitude: dto.longitude,
      price,
      status: OrderStatus.PENDING,
      notes: dto.notes || null,
    } as any);

    const saved = (await this.ordersRepo.save(order)) as unknown as Order;

    // TODO: notify available providers in region via gateway (OrdersGateway)

    return saved;
  }

  async findOne(id: number) {
    const o = await this.ordersRepo.findOne({ where: { id } });
    if (!o) throw new NotFoundException('Order not found');
    return o;
  }

  async accept(providerId: number, orderId: number, dto: AssignproviderDto) {
    const order = await this.findOne(orderId);
    if (order.status !== OrderStatus.PENDING) throw new ConflictException('Order not available for accept');

    // validate vehicle belongs to provider and is available
    const vehicle = await this.vehiclesService.findOne(dto.vehicle_id);
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    if (vehicle.user_id !== providerId) throw new ForbiddenException('Vehicle does not belong to provider');
    if (!vehicle.is_available) throw new ConflictException('Vehicle not available');

    // transaction: assign provider and mark vehicle unavailable
    return await this.dataSource.transaction(async (manager) => {
      order.provider_id = providerId;
      order.vehicle_id = dto.vehicle_id;
      order.status = OrderStatus.ACCEPTED;
      await manager.getRepository(Order).save(order as any);

      vehicle.is_available = false;
      await manager.getRepository(Vehicle).save(vehicle as any);

      return order;
    });
  }

  async start(providerId: number, orderId: number) {
    const order = await this.findOne(orderId);
    if (order.provider_id !== providerId) throw new ForbiddenException('Not assigned provider');
    if (order.status !== OrderStatus.ACCEPTED) throw new BadRequestException('Order not in accepted state');

    order.status = OrderStatus.IN_PROGRESS;
    order.start_time = new Date();
    const saved = (await this.ordersRepo.save(order)) as unknown as Order;

    // TODO: notify client via gateway

    return saved;
  }

  async complete(providerId: number, orderId: number) {
    const order = await this.findOne(orderId);
    if (order.provider_id !== providerId) throw new ForbiddenException('Not assigned provider');
    if (order.status !== OrderStatus.IN_PROGRESS) throw new BadRequestException('Order not in progress');

    return await this.dataSource.transaction(async (manager) => {
      order.status = OrderStatus.COMPLETED;
      order.end_time = new Date();
      await manager.getRepository(Order).save(order as any);

      // release vehicle
      if (order.vehicle_id) {
        const vehicle = await manager.getRepository(Vehicle).findOne({ where: { id: order.vehicle_id } as any });
        if (vehicle) {
          vehicle.is_available = true;
          await manager.getRepository(Vehicle).save(vehicle as any);
        }
      }

      // create payment record
      // Note: Payment creation logic can be delegated to PaymentsService — not present here

      return order;
    });
  }

  async cancel(userId: number, orderId: number, role: string) {
    const order = await this.findOne(orderId);
    // Rules: client before accept, provider before start, admin any time
    if (role === 'admin') {
      order.status = OrderStatus.CANCELLED;
    } else if (role === 'client') {
      if (order.client_id !== userId) throw new ForbiddenException('Not your order');
      if (order.status !== OrderStatus.PENDING) throw new BadRequestException('Cannot cancel after acceptance');
      order.status = OrderStatus.CANCELLED;
    } else if (role === 'provider') {
      if (order.provider_id !== userId) throw new ForbiddenException('Not assigned');
      if (order.status !== OrderStatus.ACCEPTED) throw new BadRequestException('Cannot cancel after start');
      order.status = OrderStatus.CANCELLED;
    } else {
      throw new ForbiddenException('Invalid role');
    }

    const saved = (await this.ordersRepo.save(order)) as unknown as Order;

    // release vehicle if assigned
    if (order.vehicle_id) {
      try {
        const vehicle = await this.vehiclesService.findOne(order.vehicle_id);
        if (vehicle) {
          await this.vehiclesService.update(vehicle.user_id, vehicle.id, { is_available: true } as any);
        }
      } catch (e) {
        this.logger.warn('Failed to release vehicle', e);
      }
    }

    // TODO: notify other party

    return saved;
  }

  async addTracking(orderId: number, lat: number, lng: number) {
    const t = this.trackingRepo.create({ order_id: orderId, latitude: lat, longitude: lng } as any);
    return (await this.trackingRepo.save(t)) as unknown as OrderTracking;
  }
}
