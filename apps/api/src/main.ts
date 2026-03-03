import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import compression from 'compression';

import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import type { AppConfig } from './config/app.config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    // Use built-in logger; swap with a custom Winston logger for production
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app')!;

  // ─── Security middleware ───────────────────────────────────────────────────
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false, // Allow Swagger UI assets
    }),
  );
  app.use(compression());

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: appConfig.corsOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
    credentials: true,
  });

  // ─── API versioning ────────────────────────────────────────────────────────
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: appConfig.apiVersion,
  });

  // ─── Global prefix ─────────────────────────────────────────────────────────
  app.setGlobalPrefix(appConfig.apiPrefix);

  // ─── Graceful shutdown ─────────────────────────────────────────────────────
  app.enableShutdownHooks();

  // ─── Swagger ───────────────────────────────────────────────────────────────
  if (appConfig.swaggerEnabled) {
    setupSwagger(app, appConfig);
  }

  await app.listen(appConfig.port);

  const url = await app.getUrl();
  Logger.log(`🚀 API running at: ${url}`, 'Bootstrap');
  if (appConfig.swaggerEnabled) {
    Logger.log(`📖 Swagger docs:  ${url}/${appConfig.swaggerPath}`, 'Bootstrap');
  }
}

bootstrap().catch((error: unknown) => {
  Logger.error('Failed to start application', error, 'Bootstrap');
  process.exit(1);
});
