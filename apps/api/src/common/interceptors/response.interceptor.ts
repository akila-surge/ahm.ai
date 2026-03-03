import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { type Request, type Response } from 'express';
import { type ApiSuccessResponse } from '@sears/contracts';

import { SKIP_TRANSFORM_KEY } from '../decorators/skip-transform.decorator';

/**
 * Wraps every successful controller response into the standard
 * ApiSuccessResponse envelope.
 *
 * Controllers can opt-out by decorating the handler or class with
 * @SkipTransform() — useful for health checks or streamed responses.
 *
 * Controllers that want a custom `message` can return:
 *   { data: <payload>, message: 'Custom message' }
 * and the interceptor will unwrap it properly.
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiSuccessResponse<T> | T> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<ApiSuccessResponse<T> | T> {
    const skip = this.reflector.getAllAndOverride<boolean>(SKIP_TRANSFORM_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skip) {
      return next.handle();
    }

    const request = context.switchToHttp().getRequest<Request>();

    return next.handle().pipe(
      map((payload) => {
        const statusCode = context.switchToHttp().getResponse<Response>().statusCode;

        // Allow controllers to supply a custom message alongside data
        const hasCustomShape =
          payload !== null &&
          typeof payload === 'object' &&
          'data' in (payload as object) &&
          'message' in (payload as object);

        const data = hasCustomShape
          ? (payload as unknown as { data: T; message: string }).data
          : payload;

        const message = hasCustomShape
          ? (payload as unknown as { data: T; message: string }).message
          : 'Success';

        const envelope: ApiSuccessResponse<T> = {
          success: true,
          data,
          message,
          statusCode,
          timestamp: new Date().toISOString(),
          path: request.url,
        };

        return envelope;
      }),
    );
  }
}
