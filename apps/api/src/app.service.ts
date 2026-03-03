import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type AppConfig } from './config/app.config';

export interface AppInfo {
  name: string;
  version: string;
  environment: string;
}

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getInfo(): AppInfo {
    const appConfig = this.configService.get<AppConfig>('app')!;
    return {
      name: appConfig.name,
      version: '1.0.0',
      environment: appConfig.env,
    };
  }
}
