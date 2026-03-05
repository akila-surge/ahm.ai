import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { AxiosError, AxiosRequestConfig } from 'axios';

export interface RestProxyOptions {
  /** Additional query parameters to merge into the request */
  params?: Record<string, string | number | boolean>;
  /** Additional headers to merge */
  headers?: Record<string, string>;
  /**
   * When true, a non-2xx response returns null instead of throwing.
   * Use for non-blocking calls (e.g. searsconnection.com local offers).
   */
  nullable?: boolean;
}

/**
 * Generic REST proxy client.
 *
 * Services inject this, build the full URL from their own config, and call get/post.
 *
 * @example
 * const data = await this.rest.get<LocationResponse>(
 *   `${cfg.searsCleanApiUrl}/location`,
 *   { params: { zipCode } },
 * );
 *
 * // Non-blocking — returns null on any error instead of throwing
 * const offers = await this.rest.get<OffersResponse>(url, { nullable: true });
 */
@Injectable()
export class RestProxyClient {
  private readonly logger = new Logger(RestProxyClient.name);

  constructor(private readonly http: HttpService) {}

  async get<T>(url: string, options: RestProxyOptions = {}): Promise<T | null> {
    return this.request<T>('GET', url, undefined, options);
  }

  async post<T>(
    url: string,
    body: unknown,
    options: RestProxyOptions = {},
  ): Promise<T | null> {
    return this.request<T>('POST', url, body, options);
  }

  private async request<T>(
    method: 'GET' | 'POST',
    url: string,
    body: unknown,
    options: RestProxyOptions,
  ): Promise<T | null> {
    const config: AxiosRequestConfig = {
      params: options.params,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response =
        method === 'GET'
          ? await firstValueFrom(this.http.get<T>(url, config))
          : await firstValueFrom(this.http.post<T>(url, body, config));

      return response.data;
    } catch (err) {
      const axiosErr = err as AxiosError;
      const status = axiosErr.response?.status;
      this.logger.error(`${method} ${url} → ${status ?? 'network error'}: ${axiosErr.message}`);

      if (options.nullable) return null;

      throw new InternalServerErrorException(
        `Upstream service error (${status ?? 'unreachable'})`,
      );
    }
  }
}
