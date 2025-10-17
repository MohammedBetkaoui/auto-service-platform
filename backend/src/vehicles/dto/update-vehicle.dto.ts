import { IsOptional, IsString, MaxLength, IsUrl, IsInt } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  brand?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  model?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  capacity?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  documents_url?: string;
}
