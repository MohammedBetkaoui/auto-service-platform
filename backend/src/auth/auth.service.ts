import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { RegisterDto, LoginDto } from './dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthResponse extends AuthTokens {
  user: {
    id: number;
    full_name: string;
    email: string;
    role: string;
    is_verified: boolean;
  };
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(registerDto: RegisterDto): Promise<{ message: string; user: Partial<User> }> {
    const { full_name, email, password, phone, role } = registerDto;

    // Vérifier si l'email existe déjà
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Créer l'utilisateur
    const user = await this.usersService.create({
      full_name,
      email,
      password_hash: password, // Le service users va le hacher
      phone,
      role,
      is_verified: true, // Par défaut, le compte est vérifié
    });

    // Générer un token de vérification
    const verificationToken = await this.generateVerificationToken(user.id, user.email);

    // TODO: Envoyer un email de vérification
    // await this.emailService.sendVerificationEmail(user.email, verificationToken);

    return {
      message: 'Compte créé avec succès. Vous pouvez maintenant vous connecter.',
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    };
  }

  /**
   * Connexion d'un utilisateur
   */
  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    // Valider l'utilisateur
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // Vérifier si le compte est vérifié
    if (!user.is_verified) {
      throw new UnauthorizedException('Veuillez vérifier votre compte par email avant de vous connecter');
    }

    // Générer les tokens
    const tokens = await this.generateTokens(user.id, user.email, user.role);

    // Sauvegarder le refresh token (haché) dans la base de données
    await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

    return {
      ...tokens,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        is_verified: user.is_verified,
      },
    };
  }

  /**
   * Valider les credentials d'un utilisateur
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmailWithPassword(email);
    
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    
    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  /**
   * Rafraîchir l'access token
   */
  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      // Vérifier le refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
      });

      // Récupérer l'utilisateur
      const user = await this.usersService.findOne(payload.sub);

      // Générer de nouveaux tokens
      const tokens = await this.generateTokens(user.id, user.email, user.role);

      // Mettre à jour le refresh token
      await this.usersService.updateRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Refresh token invalide ou expiré');
    }
  }

  /**
   * Déconnexion
   */
  async logout(userId: number): Promise<{ message: string }> {
    // Supprimer le refresh token de la base de données
    await this.usersService.updateRefreshToken(userId, null);

    return {
      message: 'Déconnexion réussie',
    };
  }

  /**
   * Vérifier le compte via token
   */
  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Vérifier le compte
      await this.usersService.verifyAccount(payload.sub);

      return {
        message: 'Compte vérifié avec succès. Vous pouvez maintenant vous connecter.',
      };
    } catch (error) {
      throw new BadRequestException('Token de vérification invalide ou expiré');
    }
  }

  /**
   * Demande de réinitialisation de mot de passe
   */
  async forgotPassword(email: string): Promise<{ message: string }> {
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      // Pour des raisons de sécurité, on retourne toujours le même message
      return {
        message: 'Si cet email existe, vous recevrez un lien de réinitialisation.',
      };
    }

    // TODO: Générer un token de réinitialisation et envoyer un email avec le lien de réinitialisation
    // const resetToken = await this.generateResetPasswordToken(user.id, user.email);
    // await this.emailService.sendResetPasswordEmail(user.email, resetToken);

    return {
      message: 'Si cet email existe, vous recevrez un lien de réinitialisation.',
    };
  }

  /**
   * Réinitialiser le mot de passe
   */
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      // Mettre à jour le mot de passe
      await this.usersService.update(payload.sub, {
        password_hash: newPassword, // Le service va le hacher
      });

      // Invalider tous les refresh tokens de l'utilisateur
      await this.usersService.updateRefreshToken(payload.sub, null);

      return {
        message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.',
      };
    } catch (error) {
      throw new BadRequestException('Token de réinitialisation invalide ou expiré');
    }
  }

  /**
   * Générer les tokens (access + refresh)
   */
  private async generateTokens(userId: number, email: string, role: string): Promise<AuthTokens> {
    const payload = { sub: userId, email, role };

    const [access_token, refresh_token] = await Promise.all([
      // Access token (courte durée: 15 minutes)
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      // Refresh token (longue durée: 7 jours)
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET') || this.configService.get<string>('JWT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token,
      refresh_token,
    };
  }

  /**
   * Générer un token de vérification d'email
   */
  private async generateVerificationToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email, type: 'verification' };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '24h', // Expire après 24 heures
    });
  }

  /**
   * Générer un token de réinitialisation de mot de passe
   */
  private async generateResetPasswordToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email, type: 'reset_password' };

    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h', // Expire après 1 heure
    });
  }
}
