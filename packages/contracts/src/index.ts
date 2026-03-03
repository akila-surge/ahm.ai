/**
 * @sears/contracts
 *
 * The single source of truth for all shared contracts between
 * the frontend (Next.js) and backend (NestJS).
 *
 * Consumers:
 *  - apps/api  → uses enums in DTOs, implements interfaces, uses schemas for validation
 *  - apps/web  → uses enums in UI, parses ApiResponse types, uses schemas for form validation
 *
 * Rules:
 *  - No platform-specific code (no Node.js builtins, no browser APIs)
 *  - No business logic — only types, enums, interfaces, and schemas
 *  - Keep exports stable; breaking changes require a version bump
 */

export * from './enums';
export * from './types';
export * from './interfaces';
export * from './schemas';
