import { registerAs } from '@nestjs/config';

export interface AppConfig {
  name: string;
  env: string;
  port: number;
  apiPrefix: string;
  apiVersion: string;
  corsOrigins: string[];
  swaggerEnabled: boolean;
  swaggerPath: string;
}

export const appConfig = registerAs(
  'app',
  (): AppConfig => ({
    name: process.env.APP_NAME ?? 'Sears API',
    env: process.env.NODE_ENV ?? 'development',
    port: parseInt(process.env.PORT ?? '3001', 10),
    apiPrefix: process.env.API_PREFIX ?? 'api',
    apiVersion: process.env.API_VERSION ?? '1',
    corsOrigins: process.env.CORS_ORIGINS?.split(',').map((o) => o.trim()) ?? [
      'http://localhost:3000',
    ],
    swaggerEnabled: process.env.SWAGGER_ENABLED !== 'false',
    swaggerPath: process.env.SWAGGER_PATH ?? 'api/docs',
  }),
);
