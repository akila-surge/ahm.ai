import { z } from 'zod';
import { SortOrder } from '../enums';

/**
 * UUID string validation schema.
 */
export const uuidSchema = z.string().uuid({ message: 'Invalid UUID format' });

/**
 * Route :id param schema.
 */
export const idParamSchema = z.object({
  id: uuidSchema,
});

export type IdParam = z.infer<typeof idParamSchema>;

/**
 * Reusable pagination query schema.
 * Use on both FE (search params) and BE (query DTOs) for consistency.
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.nativeEnum(SortOrder).default(SortOrder.ASC),
});

export type PaginationQuerySchema = z.infer<typeof paginationQuerySchema>;

/**
 * ISO 8601 date string schema.
 */
export const isoDateSchema = z.string().datetime({ offset: true });

/**
 * Non-empty trimmed string.
 */
export const nonEmptyStringSchema = z.string().trim().min(1, 'Value cannot be empty');
