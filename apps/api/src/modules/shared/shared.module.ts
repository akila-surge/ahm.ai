import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RestProxyClient } from './http/rest-proxy.client';
import { GraphqlProxyClient } from './http/graphql-proxy.client';
import { CacheService } from './cache/cache.service';

/**
 * SharedModule — reusable infrastructure for any domain module.
 *
 * Import this wherever you need outbound HTTP or in-memory caching:
 *
 * @example
 * @Module({ imports: [SharedModule], ... })
 * export class ApplianceModule {}
 *
 * Exports:
 *   - RestProxyClient      generic GET/POST for any REST endpoint
 *   - GraphqlProxyClient   generic GraphQL executor (endpoint passed per call)
 *   - CacheService         in-memory TTL cache with getOrFetch helper
 */
@Module({
  imports: [
    HttpModule.register({
      timeout: 10_000,
      maxRedirects: 3,
    }),
  ],
  providers: [RestProxyClient, GraphqlProxyClient, CacheService],
  exports: [RestProxyClient, GraphqlProxyClient, CacheService],
})
export class SharedModule {}
