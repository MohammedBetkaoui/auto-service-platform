import { IsNotEmpty, IsEnum, IsString, MaxLength, IsNumber } from 'class-validator';

export class PricingDto {
  @IsNotEmpty()
  @IsEnum(['car', 'truck', 'van', 'bike'])
  vehicle_type: 'car' | 'truck' | 'van' | 'bike';

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  region: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
