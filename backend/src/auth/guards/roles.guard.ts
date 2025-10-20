import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  /**
   * Vérifie que l'utilisateur possède l'un des rôles requis pour accéder à la ressource.
   * Lance une exception explicite si le rôle est absent ou non autorisé.
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Pas de rôles requis, accès autorisé
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }

    if (!user.role || !Object.values(UserRole).includes(user.role)) {
      throw new ForbiddenException('Rôle utilisateur invalide ou absent');
    }

    if (!requiredRoles.some((role) => user.role === role)) {
      throw new ForbiddenException('Accès interdit : rôle insuffisant');
    }

    return true;
  }
}
