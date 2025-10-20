import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoginLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path === '/api/auth/login' && req.method === 'POST') {
      const ip = req.ip;
      const email = req.body?.email;
      // Log format: date, IP, email, status
      res.on('finish', () => {
        const status = res.statusCode;
        const success = status === 200 ? 'SUCCESS' : 'FAIL';
        // Ici, on log dans la console. Pour la prod, utiliser un vrai logger ou base de données.
        console.log(`[LOGIN] [${new Date().toISOString()}] [IP: ${ip}] [Email: ${email}] [Status: ${success}]`);
      });
    }
    next();
  }
}
