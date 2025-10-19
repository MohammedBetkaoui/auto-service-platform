import { IsInt, IsOptional, IsString, Min, Max, IsBoolean } from 'class-validator';

export class CreateReviewDto {
  @IsInt()
  order_id: number;

  @IsInt()
  worker_id: number;

  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsBoolean()
  @IsOptional()
  visibility?: boolean;
}
