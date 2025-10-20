import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../entities/user.entity';

/**
 * Décorateur pour spécifier les rôles autorisés sur une route ou un contrôleur.
 * Usage : @Roles(UserRole.ADMIN, UserRole.provider)
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
