import { IsInt, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsInt()
  service_id: number;

  @IsString()
  @IsNotEmpty()
  vehicle_type: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  @IsOptional()
  notes?: string;
}
