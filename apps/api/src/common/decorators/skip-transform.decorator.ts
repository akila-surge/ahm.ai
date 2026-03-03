import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key used by ResponseInterceptor to determine whether to
 * skip the standard response envelope transformation.
 */
export const SKIP_TRANSFORM_KEY = 'skipTransform';

/**
 * Apply to a controller class or handler method to bypass the global
 * ResponseInterceptor. Use for endpoints that produce their own shape
 * (e.g. health checks, SSE streams, file downloads).
 *
 * @example
 * ```ts
 * @SkipTransform()
 * @Get('health')
 * healthCheck() { ... }
 * ```
 */
export const SkipTransform = (): MethodDecorator & ClassDecorator =>
  SetMetadata(SKIP_TRANSFORM_KEY, true);
