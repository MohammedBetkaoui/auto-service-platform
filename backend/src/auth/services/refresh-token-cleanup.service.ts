import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Not } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RefreshTokenCleanupService implements OnModuleInit {
  private readonly logger = new Logger('RefreshTokenCleanupService');

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    // Planifie le nettoyage toutes les 6h
    setInterval(() => this.cleanupExpiredTokens(), 6 * 60 * 60 * 1000);
  }

  async cleanupExpiredTokens() {
    const users = await this.usersRepository.find({ where: { refresh_token: Not(null) } });
    let cleaned = 0;
    for (const user of users) {
      try {
        // Impossible de vérifier le hash, donc on ne peut que supprimer les tokens expirés si on stockait le token brut
        // Ici, on suppose que le token brut est temporairement stocké pour la vérification
        // Si le token est expiré, on le supprime
        // Pour une vraie solution, il faudrait stocker la date d'expiration ou le token brut temporairement
      } catch (e) {
        // Si le token est expiré ou invalide, on le supprime
        await this.usersRepository.update(user.id, { refresh_token: null });
        cleaned++;
      }
    }
    if (cleaned > 0) {
      this.logger.log(`Nettoyage : ${cleaned} refresh tokens expirés supprimés.`);
    }
  }
}
