import {
  Controller,
  Get,
  Patch,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  Post,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UserRole } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

function filenameSanitizer(req, file, cb) {
  const name = file.originalname
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-')
    .replace(/-+/g, '-');
  const fileExtName = extname(file.originalname);
  cb(null, `${Date.now()}-${name}${fileExtName}`);
}

@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('users/me')
  async getProfile(@Request() req) {
    const userId = req.user?.id;
    const user = await this.usersService.findOne(userId);
    if (user && (user as any).password_hash) delete (user as any).password_hash;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/update-profile')
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    const userId = req.user?.id;

    // Prevent role or password updates via this route
    delete (dto as any).role;
    delete (dto as any).password_hash;

    const updated = await this.usersService.update(userId, dto as any);
    return {
      message: 'Profil mis à jour',
      user: updated,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/update-password')
  async updatePassword(@Request() req, @Body() dto: UpdatePasswordDto) {
    const userId = req.user.id;
    const user = await this.usersService.findByEmailWithPassword(req.user.email);
    if (!user) throw new BadRequestException('Utilisateur introuvable');

    const match = await bcrypt.compare(dto.current_password, user.password_hash);
    if (!match) throw new BadRequestException('Le mot de passe actuel est invalide');

    // Hash new password and update
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
    const hashed = await bcrypt.hash(dto.new_password, saltRounds);
    await this.usersService.update(userId, { password_hash: hashed } as any);

    // Invalidate refresh tokens - best-effort (service may implement storage)
    try {
      await this.usersService.updateRefreshToken(userId, null);
    } catch (e) {
      // ignore
    }

    return { message: 'Mot de passe mis à jour' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.provider)
  @Patch('users/status')
  async updateStatus(@Request() req, @Body() dto: UpdateStatusDto) {
    const userId = req.user?.id;
    const updated = await this.usersService.update(userId, { is_available: dto.is_available } as any);
    return { message: 'Statut de disponibilité mis à jour', user: updated };
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/upload-avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: filenameSanitizer,
      }),
      fileFilter: (req, file, cb) => {
        const allowed = ['.jpg', '.jpeg', '.png'];
        const ext = extname(file.originalname).toLowerCase();
        if (!allowed.includes(ext)) {
          return cb(new BadRequestException('Type de fichier non autorisé'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(@UploadedFile() file, @Request() req) {
    if (!file) throw new BadRequestException('Fichier requis');

    // Save path to user profile
    const avatarPath = `/uploads/avatars/${file.filename}`;
    const updated = await this.usersService.update(req.user.id, { avatar_url: avatarPath } as any);
    return { message: 'Avatar téléversé', avatar_url: avatarPath, user: updated };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/me')
  async removeSelf(@Request() req) {
    const userId = req.user?.id;
    await this.usersService.remove(userId);
    return { message: 'Votre compte a été supprimé avec succès' };
  }

  // Public provider profile
  @Get('users/provider/:id')
  async getproviderPublic(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getproviderPublicProfile(id);
  }

  // Admin routes
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('admin/users')
  async adminList(@Query('role') role?: string) {
    if (role) return this.usersService.findAll();
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Patch('admin/users/:id/status')
  async adminUpdateStatus(@Param('id', ParseIntPipe) id: number, @Body() body: { status: 'active' | 'inactive' | 'banned' }) {
    const updated = await this.usersService.update(id, { status: body.status } as any);
    return { message: 'Statut utilisateur mis à jour', user: updated };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/users/:id')
  async adminRemove(@Param('id', ParseIntPipe) id: number) {
    await this.usersService.remove(id);
    return { message: 'Utilisateur supprimé' };
  }
}
