import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  RefreshTokenDto,
  ForgotPasswordDto,
  ResetPasswordDto,
} from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RateLimitGuard } from './guards/rate-limit.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Inscription d'un nouvel utilisateur
   * POST /api/auth/register
   */
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }

  /**
   * Connexion d'un utilisateur
   * POST /api/auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RateLimitGuard)
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  /**
   * Rafraîchir le token
   * POST /api/auth/refresh
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto.refresh_token);
  }

  /**
   * Déconnexion
   * POST /api/auth/logout
   */
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: any) {
    return await this.authService.logout(user.id);
  }

  /**
   * Vérifier l'email via token
   * GET /api/auth/verify?token=xxxxx
   */
  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Query('token') token: string) {
    return await this.authService.verifyEmail(token);
  }

  /**
   * Demande de réinitialisation de mot de passe
   * POST /api/auth/forgot-password
   */
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }

  /**
   * Réinitialiser le mot de passe
   * POST /api/auth/reset-password
   */
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.new_password,
    );
  }

  /**
   * Obtenir le profil de l'utilisateur connecté
   * GET /api/auth/profile
   */
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getProfile(@CurrentUser() user: any) {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }

  /**
   * Test de route protégée
   * GET /api/auth/test
   */
  @Get('test')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async test(@CurrentUser() user: any) {
    return {
      message: 'Route protégée accessible',
      user,
    };
  }
}
