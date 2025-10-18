import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn(['unread','read'])
  status: 'unread' | 'read';
}
