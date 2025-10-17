import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Créer un nouvel utilisateur
   */
  async create(userData: Partial<User>): Promise<User> {
    // Vérifier si l'email existe déjà
    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // Hacher le mot de passe
    if (userData.password_hash) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
      userData.password_hash = await bcrypt.hash(userData.password_hash, saltRounds);
    }

    const user = this.usersRepository.create(userData);
    return await this.usersRepository.save(user);
  }

  /**
   * Trouver tous les utilisateurs
   */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'full_name', 'email', 'phone', 'role', 'is_verified', 'created_at', 'updated_at'],
    });
  }

  /**
   * Trouver un utilisateur par ID
   */
  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }

    return user;
  }

  /**
   * Trouver un utilisateur par email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Trouver un utilisateur par email (avec le mot de passe pour l'authentification)
   */
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  /**
   * Mettre à jour un utilisateur
   */
  async update(id: number, updateData: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);

    // If the password is being updated, hash it here
    if (updateData.password_hash) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
      updateData.password_hash = await bcrypt.hash(updateData.password_hash, saltRounds);
    }

    Object.assign(user, updateData);
    return await this.usersRepository.save(user);
  }

  /**
   * Return a public profile for a worker
   */
  async getWorkerPublicProfile(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Worker with id ${id} not found`);

    // compute average rating from reviews if available
  const reviewsRaw = await this.usersRepository.manager.find('review', { where: { worker: id } } as any).catch(() => []);
  const reviews = (reviewsRaw as any[]) || [];
  const avg = reviews.length ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length : null;

    return {
      id: user.id,
      full_name: user.full_name,
      city: user.city,
      is_available: user.is_available,
      avatar_url: user.avatar_url,
      average_rating: avg,
    };
  }

  /**
   * Mettre à jour le refresh token
   */
  async updateRefreshToken(userId: number, refreshToken: string | null): Promise<void> {
    let hashedToken = null;
    if (refreshToken) {
      hashedToken = await bcrypt.hash(refreshToken, 10);
    }

    await this.usersRepository.update(userId, {
      // Vous pouvez ajouter un champ refresh_token dans l'entité User si nécessaire
      // Pour l'instant, nous le gérons différemment
    });
  }

  /**
   * Vérifier le compte d'un utilisateur
   */
  async verifyAccount(userId: number): Promise<User> {
    const user = await this.findOne(userId);
    user.is_verified = true;
    return await this.usersRepository.save(user);
  }

  /**
   * Supprimer un utilisateur
   */
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }

  /**
   * Compter les utilisateurs par rôle
   */
  async countByRole(role: string): Promise<number> {
    return await this.usersRepository.count({ where: { role } as any });
  }
}
