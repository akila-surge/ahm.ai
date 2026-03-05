import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { AxiosError } from 'axios';

export interface GqlRequest {
  operationName: string;
  /** Raw GraphQL query or mutation string */
  query: string;
  variables: Record<string, unknown>;
}

interface GqlResponse<T> {
  data: T;
  /** GraphQL errors surface here even on HTTP 200 — always checked */
  errors?: Array<{ message: string; extensions?: Record<string, unknown> }>;
}

/**
 * Generic GraphQL proxy client.
 *
 * The caller passes the full endpoint URL so this client is reusable across
 * any GraphQL backend (SHS, or any future domain).
 *
 * @example
 * const result = await this.gql.execute<AvailabilityData>(
 *   cfg.shsGraphqlUrl,
 *   { operationName: 'getAvailability', query, variables },
 * );
 */
@Injectable()
export class GraphqlProxyClient {
  private readonly logger = new Logger(GraphqlProxyClient.name);

  constructor(private readonly http: HttpService) {}

  async execute<T>(endpoint: string, request: GqlRequest): Promise<T> {
    try {
      const { data } = await firstValueFrom(
        this.http.post<GqlResponse<T>>(endpoint, request, {
          headers: { 'Content-Type': 'application/json' },
        }),
      );

      // GraphQL errors come in data.errors even when HTTP status is 200
      if (data.errors?.length) {
        const msg = data.errors.map((e) => e.message).join('; ');
        this.logger.error(`GraphQL [${request.operationName}] @ ${endpoint}: ${msg}`);
        throw new InternalServerErrorException(`Upstream GraphQL error: ${msg}`);
      }

      return data.data;
    } catch (err) {
      if (err instanceof InternalServerErrorException) throw err;
      this.logger.error(
        `GraphQL request failed [${request.operationName}]: ${(err as AxiosError).message}`,
      );
      throw new InternalServerErrorException('GraphQL service unavailable');
    }
  }
}
