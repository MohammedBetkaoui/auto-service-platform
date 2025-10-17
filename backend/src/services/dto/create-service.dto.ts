import { IsString, IsNotEmpty, MaxLength, IsEnum, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsEnum(['wash', 'oil_change', 'repair', 'towing', 'battery', 'other'])
  category: 'wash' | 'oil_change' | 'repair' | 'towing' | 'battery' | 'other';

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  base_price: number;

  @IsNotEmpty()
  @IsEnum(['vehicle', 'hour', 'distance'])
  unit: 'vehicle' | 'hour' | 'distance';

  @IsOptional()
  @IsString()
  @MaxLength(50)
  duration_estimate?: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(255)
  image_url?: string;
}
