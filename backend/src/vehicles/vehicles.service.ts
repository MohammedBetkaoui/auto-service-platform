import { Injectable, NotFoundException, ConflictException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from '../entities/vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehiclesRepository: Repository<Vehicle>,
  ) {}

  async create(userId: number, dto: CreateVehicleDto): Promise<Vehicle> {
    // Check license plate uniqueness
    const existing = await this.vehiclesRepository.findOne({ where: { license_plate: dto.license_plate } });
    if (existing) throw new ConflictException('License plate already exists');

  const vehicle = this.vehiclesRepository.create({ ...dto, user_id: userId, status: 'pending' } as any);
  return (await this.vehiclesRepository.save(vehicle)) as unknown as Vehicle;
  }

  async findMy(userId: number): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find({ where: { user_id: userId } });
  }

  async findAll(): Promise<Vehicle[]> {
    return await this.vehiclesRepository.find();
  }

  async findOne(id: number): Promise<Vehicle> {
    const vehicle = await this.vehiclesRepository.findOne({ where: { id } });
    if (!vehicle) throw new NotFoundException('Vehicle not found');
    return vehicle;
  }

  async update(userId: number, id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    if (vehicle.user_id !== userId) throw new ForbiddenException('Not allowed');

    // If license_plate modification is allowed in another flow, set status back to pending there
    Object.assign(vehicle, dto);
    vehicle.status = 'pending';
  return (await this.vehiclesRepository.save(vehicle)) as unknown as Vehicle;
  }

  async updateStatus(userId: number, id: number, is_available: boolean): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
    if (vehicle.user_id !== userId) throw new ForbiddenException('Not allowed');
  vehicle.is_available = is_available;
  return (await this.vehiclesRepository.save(vehicle)) as unknown as Vehicle;
  }

  async remove(userId: number, id: number): Promise<void> {
    const vehicle = await this.findOne(id);
    // Allow admin to delete by passing userId = 0
    if (userId !== 0 && vehicle.user_id !== userId) throw new ForbiddenException('Not allowed');

    // Check for active orders referencing this vehicle
    const activeOrders = await this.vehiclesRepository.manager.count('orders', { where: { vehicle_id: id, status: 'in_progress' } as any }).catch(() => 0);
    if (activeOrders && activeOrders > 0) throw new ConflictException('Vehicle has active orders and cannot be deleted');

    await this.vehiclesRepository.remove(vehicle);
  }

  // Admin approve/reject
  async approve(id: number, status: 'approved' | 'rejected'): Promise<Vehicle> {
    const vehicle = await this.findOne(id);
  vehicle.status = status;
  return (await this.vehiclesRepository.save(vehicle)) as unknown as Vehicle;
  }
}
