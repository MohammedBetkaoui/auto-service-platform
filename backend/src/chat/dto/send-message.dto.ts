import { IsInt, IsOptional, IsString, IsIn } from 'class-validator';

export class SendMessageDto {
  @IsInt()
  conversation_id: number;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsString()
  attachment_url?: string;

  @IsOptional()
  @IsIn(['text','image','file','audio'])
  type?: 'text' | 'image' | 'file' | 'audio';
}
