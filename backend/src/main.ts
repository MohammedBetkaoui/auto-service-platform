import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import hpp from 'hpp';
import compression from 'compression';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Sécurité CORS renforcée (OWASP)
  app.enableCors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'], // Liste blanche stricte
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'X-CSRF-Token',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    exposedHeaders: ['Authorization'],
    maxAge: 86400,
  });

  // Security middleware
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
      max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // limit each IP
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use(xss());
  app.use(hpp());
  app.use(compression());
  app.use(cookieParser());

  // Journalisation des tentatives de connexion
  const { LoginLoggerMiddleware } = require('./auth/middlewares/login-logger.middleware');
  app.use(new LoginLoggerMiddleware().use);

  // Body size limits
  app.use((req, res, next) => {
    req.setTimeout(parseInt(process.env.REQUEST_TIMEOUT_MS || '120000')); // 2 minutes
    next();
  });

  // Enable validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Set global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}/api`);
}
bootstrap();
