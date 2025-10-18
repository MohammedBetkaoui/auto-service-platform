import { Controller, Post, Body, UseGuards, Request, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller()
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('reviews')
  async create(@Request() req, @Body() dto: CreateReviewDto) {
    const saved = await this.reviewsService.create(req.user.id, dto);
    return { message: 'Review created', review: saved };
  }

  @UseGuards(JwtAuthGuard)
  @Get('reviews/my')
  async myReviews(@Request() req) {
    return await this.reviewsService.findByClient(req.user.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.WORKER)
  @Get('reviews/received')
  async received(@Request() req) {
    return await this.reviewsService.findByWorker(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('reviews/:id/report')
  async report(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const res = await this.reviewsService.report(id, req.user.id);
    return { message: 'Reported', review: res };
  }

  // Admin endpoints could be added (list all, delete, moderate)
}
