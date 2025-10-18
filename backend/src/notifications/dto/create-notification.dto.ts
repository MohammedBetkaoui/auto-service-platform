import { IsInt, IsString, IsOptional, IsIn } from 'class-validator';

export class CreateNotificationDto {
  @IsInt()
  @IsOptional()
  sender_id?: number;

  @IsInt()
  receiver_id: number;

  @IsString()
  @IsIn(['order','payment','review','system','message'])
  type: string;

  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsIn(['normal','high','critical'])
  priority?: string;
}
