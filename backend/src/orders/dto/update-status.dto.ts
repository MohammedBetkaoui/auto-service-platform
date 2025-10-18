import { IsIn, IsOptional } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['pending', 'accepted', 'in_progress', 'completed', 'cancelled'])
  status: string;

  @IsOptional()
  reason?: string;
}
