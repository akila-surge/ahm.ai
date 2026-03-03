/**
 * Standard success response envelope returned by all API endpoints.
 * The BE generates this shape; the FE parses it.
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
}

/**
 * Standard error response envelope returned on failures.
 */
export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown[];
  };
  statusCode: number;
  timestamp: string;
  path: string;
}

/**
 * Union of all possible API response shapes.
 */
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Helper type guard to narrow an ApiResponse to a success response.
 */
export function isApiSuccess<T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * Helper type guard to narrow an ApiResponse to an error response.
 */
export function isApiError(response: ApiResponse): response is ApiErrorResponse {
  return response.success === false;
}
