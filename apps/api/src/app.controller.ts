import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService, type AppInfo } from './app.service';

/**
 * Root controller — no version prefix, accessible at GET /api/
 * Returns basic metadata about the running application instance.
 */
@ApiTags('Application')
@Controller({ path: '', version: VERSION_NEUTRAL })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Get application info',
    description: 'Returns the application name, version, and current environment.',
  })
  getInfo(): AppInfo {
    return this.appService.getInfo();
  }
}
