import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Le refresh token est requis' })
  @IsString()
  refresh_token: string;
}
