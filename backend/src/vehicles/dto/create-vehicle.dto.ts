import { IsString, IsNotEmpty, MaxLength, IsEnum, IsOptional, IsInt, IsUrl } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  brand: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  model: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  license_plate: string;

  @IsNotEmpty()
  @IsEnum(['car', 'truck', 'van', 'bike'])
  type: 'car' | 'truck' | 'van' | 'bike';

  @IsOptional()
  @IsString()
  @MaxLength(50)
  capacity?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  color?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  documents_url?: string;
}
