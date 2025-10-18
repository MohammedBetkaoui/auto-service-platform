import { IsInt } from 'class-validator';

export class AssignWorkerDto {
  @IsInt()
  vehicle_id: number;
}
