import { IsOptional, IsInt, IsString } from 'class-validator';

export class NotificationFilterDto {
  @IsOptional()
  @IsInt()
  receiver_id?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
