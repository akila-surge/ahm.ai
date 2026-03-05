import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { appConfig } from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HealthModule } from './modules/health/health.module';

/**
 * Root application module.
 *
 * Architecture notes:
 *  - ConfigModule is global so ConfigService is available everywhere without re-importing.
 *  - AllExceptionsFilter, LoggingInterceptor, and ResponseInterceptor are registered via
 *    APP_* tokens so they participate in NestJS DI (can inject other services).
 *  - ValidationPipe with whitelist + transform is registered globally via APP_PIPE.
 *  - Domain modules go under src/modules/ and are imported here.
 */
@Module({
  imports: [
    // ─── Config (global) ────────────────────────────────────────────────────
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),

    // ─── Feature modules ────────────────────────────────────────────────────
    HealthModule,
    // Add your domain modules here, e.g.:
  ],
  controllers: [AppController],
  providers: [
    AppService,

    // ─── Global exception filter ─────────────────────────────────────────────
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },

    // ─── Global interceptors (order matters — logging runs before transform) ──
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // ─── Global validation pipe ───────────────────────────────────────────────
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,           // Strip properties not in the DTO
        forbidNonWhitelisted: true, // Reject requests with unknown properties
        transform: true,            // Auto-convert primitives (string → number, etc.)
        transformOptions: {
          enableImplicitConversion: true,
        },
        errorHttpStatusCode: 422,  // Use 422 Unprocessable Entity for validation errors
      }),
    },
  ],
})
export class AppModule {}
