import { Injectable } from '@nestjs/common';

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

/**
 * Lightweight in-memory TTL cache.
 *
 * Suitable for infrequently-changing data (pricing, products, availability).
 * Entries are lazily evicted on read — no background sweep needed at this scale.
 *
 * Use domain-specific TTL constants (e.g. PREVENT_CACHE_TTL) when calling set/getOrFetch.
 *
 * @example
 * const data = await this.cache.getOrFetch(
 *   `pricing:${zipCode}:${serviceType}`,
 *   PREVENT_CACHE_TTL.PRICING,
 *   () => this.rest.get(url),
 * );
 */
@Injectable()
export class CacheService {
  private readonly store = new Map<string, CacheEntry<unknown>>();

  get<T>(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value as T;
  }

  set<T>(key: string, value: T, ttlSeconds: number): void {
    this.store.set(key, {
      value,
      expiresAt: Date.now() + ttlSeconds * 1_000,
    });
  }

  /**
   * Returns the cached value if still fresh, otherwise calls `fetcher`,
   * stores the result with the given TTL, and returns it.
   */
  async getOrFetch<T>(
    key: string,
    ttlSeconds: number,
    fetcher: () => Promise<T>,
  ): Promise<T> {
    const cached = this.get<T>(key);
    if (cached !== undefined) return cached;

    const value = await fetcher();
    this.set(key, value, ttlSeconds);
    return value;
  }

  invalidate(key: string): void {
    this.store.delete(key);
  }

  /** Removes all keys whose name matches the given regex pattern. */
  invalidatePattern(pattern: string): void {
    const regex = new RegExp(pattern);
    for (const key of this.store.keys()) {
      if (regex.test(key)) this.store.delete(key);
    }
  }
}
