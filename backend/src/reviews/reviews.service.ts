import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { RatingsSummary } from '../entities/ratings_summary.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UsersService } from '../users/users.service';
import { ServicesService } from '../services/services.service';
import { VehiclesService } from '../vehicles/vehicles.service';
import { calculateAverageRating } from './utils/rating-calculator';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
    @InjectRepository(RatingsSummary) private summaryRepo: Repository<RatingsSummary>,
    private usersService: UsersService,
    private servicesService: ServicesService,
    private vehiclesService: VehiclesService,
  ) {}

  async create(clientId: number, dto: CreateReviewDto) {
    // Validate order & uniqueness: simplified — assume caller validated order completed
    // Prevent duplicate review for same order
    const existing = await this.reviewRepo.findOne({ where: { order_id: dto.order_id } as any });
    if (existing) throw new BadRequestException('Review already exists for this order');

    const r = this.reviewRepo.create({ ...dto, client_id: clientId } as any);
    const saved = await this.reviewRepo.save(r);

    // Update summary for worker
    await this.updateWorkerSummary(dto.worker_id);

    // Update service and vehicle aggregate ratings (optional)
    try {
      const svcId = (dto as any).service_id;
      if (svcId) await this.updateServiceRating(svcId);
    } catch (e) {}
    if ((dto as any).vehicle_id) {
      try {
        await this.updateVehicleRating((dto as any).vehicle_id);
      } catch (e) {}
    }

    return saved;
  }

  async updateWorkerSummary(workerId: number) {
    const { avg, count } = await this.reviewRepo
      .createQueryBuilder('r')
      .select('AVG(r.rating)', 'avg')
      .addSelect('COUNT(r.id)', 'count')
      .where('r.worker_id = :workerId', { workerId })
      .getRawOne();

    const avgNum = Number(avg || 0);
    const cnt = Number(count || 0);

    let summary = (await this.summaryRepo.findOne({ where: { worker_id: workerId } as any })) as any;
    if (!summary) {
      summary = this.summaryRepo.create({ worker_id: workerId, total_reviews: cnt, avg_rating: Number(avgNum.toFixed(2)) } as any);
    } else {
      summary.total_reviews = cnt;
      summary.avg_rating = Number(avgNum.toFixed(2));
    }
    await this.summaryRepo.save(summary as any);

    // Optionally update users.rating column — if present
    try {
      await this.usersService.update(workerId, { rating: summary.avg_rating } as any);
    } catch (e) {}
  }

  async updateServiceRating(serviceId: number) {
    const { avg } = await this.reviewRepo
      .createQueryBuilder('r')
      .select('AVG(r.rating)', 'avg')
      .where('r.service_id = :serviceId', { serviceId })
      .getRawOne();
    const avgNum = Number(avg || 0);
    // Update service entity (assume servicesService has update method)
    try {
      await this.servicesService.update(serviceId, { rating: Number(avgNum.toFixed(2)) } as any);
    } catch (e) {}
  }

  async updateVehicleRating(vehicleId: number) {
    const { avg } = await this.reviewRepo
      .createQueryBuilder('r')
      .select('AVG(r.rating)', 'avg')
      .where('r.vehicle_id = :vehicleId', { vehicleId })
      .getRawOne();
    const avgNum = Number(avg || 0);
    try {
      await this.vehiclesService.update(0, vehicleId, { rating: Number(avgNum.toFixed(2)) } as any);
    } catch (e) {}
  }

  // Other methods: list, find by filters, report, admin operations
  async findByClient(clientId: number) {
    return await this.reviewRepo.find({ where: { client_id: clientId } as any });
  }

  async findByWorker(workerId: number) {
    return await this.reviewRepo.find({ where: { worker_id: workerId } as any });
  }

  async report(reviewId: number, reporterId: number) {
    const r = await this.reviewRepo.findOne({ where: { id: reviewId } as any });
    if (!r) throw new NotFoundException('Review not found');
    r.reported = true;
    return await this.reviewRepo.save(r);
  }
}
