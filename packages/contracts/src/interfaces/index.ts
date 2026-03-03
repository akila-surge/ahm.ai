import { type PaginationMeta } from '../types/pagination.types';

/**
 * Minimum shape every persisted entity must satisfy.
 * Shared so FE can type API responses and BE can type ORM entities consistently.
 */
export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Soft-delete extension for entities that support it.
 */
export interface ISoftDeletableEntity extends IBaseEntity {
  deletedAt: Date | null;
}

/**
 * Generic repository contract.
 * Implement this in the API layer so every domain stays consistent.
 */
export interface IRepository<
  TEntity extends IBaseEntity,
  TCreateDto,
  TUpdateDto,
> {
  findById(id: string): Promise<TEntity | null>;
  findAll(filters?: Record<string, unknown>): Promise<TEntity[]>;
  create(dto: TCreateDto): Promise<TEntity>;
  update(id: string, dto: TUpdateDto): Promise<TEntity>;
  remove(id: string): Promise<void>;
}

/**
 * Extension of IRepository with pagination support.
 */
export interface IPaginatedRepository<
  TEntity extends IBaseEntity,
  TCreateDto,
  TUpdateDto,
> extends IRepository<TEntity, TCreateDto, TUpdateDto> {
  findPaginated(
    filters: Record<string, unknown>,
    page: number,
    limit: number,
  ): Promise<{ items: TEntity[]; meta: PaginationMeta }>;
}
