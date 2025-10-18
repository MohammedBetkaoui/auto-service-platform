import { IsInt, IsOptional } from 'class-validator';

export class CreateConversationDto {
  @IsInt()
  participant1_id: number;

  @IsInt()
  participant2_id: number;

  @IsOptional()
  is_support_chat?: boolean;
}
