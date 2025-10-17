import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/service.entity';
import { ServicePricing } from '../entities/service_pricing.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { PricingDto } from './dto/pricing.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepo: Repository<Service>,
    @InjectRepository(ServicePricing)
    private pricingRepo: Repository<ServicePricing>,
  ) {}

  async create(dto: CreateServiceDto): Promise<Service> {
    const exists = await this.servicesRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new ConflictException('Service name already exists');
  const s = this.servicesRepo.create(dto as any);
  return (await this.servicesRepo.save(s)) as unknown as Service;
  }

  async update(id: number, dto: UpdateServiceDto): Promise<Service> {
    const s = await this.servicesRepo.findOne({ where: { id } });
    if (!s) throw new NotFoundException('Service not found');
    // Prevent category change
    delete (dto as any).category;
  Object.assign(s, dto);
  return (await this.servicesRepo.save(s)) as unknown as Service;
  }

  async listActive(filter?: { category?: string }) {
    const qb = this.servicesRepo.createQueryBuilder('s').where('s.is_active = :active', { active: true });
    if (filter?.category) qb.andWhere('s.category = :category', { category: filter.category });
    return await qb.getMany();
  }

  async getPrice(serviceId: number, vehicle_type?: string, region?: string): Promise<number> {
    const svc = await this.servicesRepo.findOne({ where: { id: serviceId } });
    if (!svc) throw new NotFoundException('Service not found');

    if (vehicle_type && region) {
      const p = await this.pricingRepo.findOne({ where: { service_id: serviceId, vehicle_type, region } as any });
      if (p) return Number(p.price);
    }

    return Number(svc.base_price);
  }

  // Pricing management
  async addPricing(serviceId: number, dto: PricingDto) {
    const svc = await this.servicesRepo.findOne({ where: { id: serviceId } });
    if (!svc) throw new NotFoundException('Service not found');
  const p = this.pricingRepo.create({ ...dto, service_id: serviceId } as any);
  return (await this.pricingRepo.save(p)) as unknown as ServicePricing;
  }
}
