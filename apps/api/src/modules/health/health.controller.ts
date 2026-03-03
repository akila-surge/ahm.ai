import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SkipTransform } from '../../common/decorators/skip-transform.decorator';

/**
 * Health check endpoint.
 * Returns Terminus-native structure — NOT wrapped in the standard envelope.
 * Useful for load balancers and uptime monitors (e.g. AWS ALB, k8s liveness).
 *
 * GET /api/v1/health
 */
@ApiTags('Health')
@Controller({ path: 'health', version: '1' })
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly memory: MemoryHealthIndicator,
    private readonly disk: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  @SkipTransform()
  @ApiOperation({ summary: 'Application health check', description: 'Returns component health.' })
  check() {
    return this.health.check([
      // Heap must stay under 300 MB
      () => this.memory.checkHeap('memory_heap', 300 * 1024 * 1024),
      // RSS must stay under 512 MB
      () => this.memory.checkRSS('memory_rss', 512 * 1024 * 1024),
      // Disk must have > 10% free space
      () => this.disk.checkStorage('disk', { path: '/', thresholdPercent: 0.9 }),
    ]);
  }
}
