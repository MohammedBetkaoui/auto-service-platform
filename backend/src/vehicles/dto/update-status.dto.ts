import { IsBoolean } from 'class-validator';

export class UpdateVehicleStatusDto {
  @IsBoolean()
  is_available: boolean;
}
