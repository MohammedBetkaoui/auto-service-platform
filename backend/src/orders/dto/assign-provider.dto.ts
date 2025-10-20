import { IsInt } from 'class-validator';

export class AssignproviderDto {
  @IsInt()
  vehicle_id!: number;
}
