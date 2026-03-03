import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  Logger,
  type NestInterceptor,
} from '@nestjs/common';
import { type Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { type Request, type Response } from 'express';

/**
 * Logs every incoming request and its outcome (status code + duration).
 * Registered globally via APP_INTERCEPTOR so it runs on every route.
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, url, ip } = request;
    const userAgent = request.get('user-agent') ?? '-';
    const start = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse<Response>();
          const duration = Date.now() - start;
          this.logger.log(
            `${method} ${url} ${response.statusCode} — ${duration}ms [${ip}] "${userAgent}"`,
          );
        },
        error: (error: { status?: number }) => {
          const duration = Date.now() - start;
          this.logger.error(
            `${method} ${url} ${error.status ?? 500} — ${duration}ms [${ip}] "${userAgent}"`,
          );
        },
      }),
    );
  }
}
