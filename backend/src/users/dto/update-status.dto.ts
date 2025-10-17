import { IsBoolean } from 'class-validator';

export class UpdateStatusDto {
  @IsBoolean()
  is_available: boolean;
}
