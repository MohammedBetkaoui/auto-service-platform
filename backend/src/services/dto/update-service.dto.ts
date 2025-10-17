import { IsOptional, IsString, MaxLength, IsNumber, IsBoolean, IsUrl } from 'class-validator';

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  base_price?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  duration_estimate?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  image_url?: string;
}
