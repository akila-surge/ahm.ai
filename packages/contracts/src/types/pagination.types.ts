import { type SortOrder } from '../enums';

/**
 * Metadata included with every paginated response.
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Standard paginated response wrapper.
 * Used as the `data` field inside ApiSuccessResponse for list endpoints.
 */
export interface PaginatedResponse<T> {
  items: T[];
  meta: PaginationMeta;
}

/**
 * Query parameters for paginated endpoints.
 * Both FE and BE use this to stay in sync on what params are supported.
 */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
}
