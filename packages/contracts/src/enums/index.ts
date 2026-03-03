/**
 * Common API status values used in responses.
 */
export enum ApiStatus {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

/**
 * Sort direction for paginated queries.
 */
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

/**
 * Deployment environment identifiers.
 */
export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test',
}

/**
 * Standard HTTP methods.
 */
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}
