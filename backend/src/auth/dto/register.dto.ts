import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, Matches, IsEnum, IsPhoneNumber } from 'class-validator';
import { UserRole } from '../../entities/user.entity';

export class RegisterDto {
  @IsNotEmpty({ message: 'Le nom complet est requis' })
  @IsString()
  @MinLength(3, { message: 'Le nom doit contenir au moins 3 caractères' })
  @MaxLength(100, { message: 'Le nom ne peut pas dépasser 100 caractères' })
  full_name: string;

  @IsNotEmpty({ message: 'L\'email est requis' })
  @IsEmail({}, { message: 'Email invalide' })
  @MaxLength(120, { message: 'L\'email ne peut pas dépasser 120 caractères' })
  email: string;

  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre',
  })
  password: string;

  @IsNotEmpty({ message: 'Le numéro de téléphone est requis' })
  @IsString()
  @MinLength(10, { message: 'Le numéro de téléphone doit contenir au moins 10 caractères' })
  @MaxLength(20, { message: 'Le numéro de téléphone ne peut pas dépasser 20 caractères' })
  phone: string;

  @IsNotEmpty({ message: 'Le rôle est requis' })
  @IsEnum(UserRole, { message: 'Le rôle doit être client, worker ou admin' })
  role: UserRole;
}
