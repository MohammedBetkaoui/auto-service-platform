import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

// Configuration du rate limiting pour le login
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 tentatives
  message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
  keyGenerator: (req: Request) => req.ip,
  handler: (req: Request, res: Response) => {
    throw new HttpException('Trop de tentatives de connexion. Réessayez plus tard.', HttpStatus.TOO_MANY_REQUESTS);
  },
});

@Injectable()
export class RateLimitGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();
    let allowed = true;
    loginRateLimiter(req, res, (result: any) => {
      if (result instanceof Error) {
        allowed = false;
      }
    });
    return allowed;
  }
}
