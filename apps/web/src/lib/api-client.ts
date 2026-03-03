import { type ApiResponse, type ApiSuccessResponse, isApiSuccess } from '@sears/contracts';
import { env } from './env';

const API_BASE_URL = env.NEXT_PUBLIC_API_URL;

// ─── Error class ──────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly code?: string,
    public readonly details?: unknown[],
  ) {
    super(message);
    this.name = 'ApiError';
    // Maintains proper stack trace in V8
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// ─── Internal fetch wrapper ───────────────────────────────────────────────────

interface FetchOptions extends RequestInit {
  /**
   * If true, don't parse the response as JSON — return the raw Response.
   * Useful for file downloads, SSE, etc.
   */
  raw?: boolean;
}

async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { raw, ...init } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    Accept: 'application/json',
    // Only set Content-Type for requests with a body — prevents CORS preflight issues on GETs
    ...(init.body !== undefined && init.body !== null ? { 'Content-Type': 'application/json' } : {}),
    ...init.headers,
  };

  const response = await fetch(url, { ...init, headers });

  if (raw) {
    return response as unknown as T;
  }

  // Parse the response envelope
  const envelope = (await response.json()) as ApiResponse<T>;

  if (!isApiSuccess(envelope)) {
    throw new ApiError(
      envelope.statusCode,
      envelope.error.message,
      envelope.error.code,
      envelope.error.details,
    );
  }

  return (envelope as ApiSuccessResponse<T>).data;
}

// ─── Public API client ────────────────────────────────────────────────────────

/**
 * Lightweight, typed HTTP client that speaks the @sears/contracts API envelope.
 *
 * All methods throw `ApiError` on non-2xx responses so you can handle errors
 * uniformly with try/catch or React error boundaries.
 *
 * Server-side usage (RSC, Route Handlers): pass `{ cache: 'no-store' }` or
 * `{ next: { revalidate: 60 } }` in the options to control caching.
 *
 * @example
 * ```ts
 * const user = await apiClient.get<User>('/v1/users/123');
 * const created = await apiClient.post<User>('/v1/users', { name: 'Alice' });
 * ```
 */
export const apiClient = {
  get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'GET' });
  },

  post<T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  put<T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  patch<T>(endpoint: string, body: unknown, options?: FetchOptions): Promise<T> {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
  },
};
