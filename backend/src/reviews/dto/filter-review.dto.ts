import { IsOptional, IsInt, IsString } from 'class-validator';

export class FilterReviewDto {
  @IsOptional()
  @IsInt()
  worker_id?: number;

  @IsOptional()
  @IsInt()
  service_id?: number;

  @IsOptional()
  @IsString()
  sort?: string; // e.g. 'date_desc', 'rating_desc'
}
