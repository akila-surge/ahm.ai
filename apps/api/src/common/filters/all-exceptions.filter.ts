import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { type Request, type Response } from 'express';
import { type ApiErrorResponse } from '@sears/contracts';

/**
 * Catches every unhandled exception and converts it into the standard
 * ApiErrorResponse envelope so clients always receive a consistent shape.
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    let message = 'Internal server error';
    let details: unknown[] = [];

    if (typeof exceptionResponse === 'string') {
      message = exceptionResponse;
    } else if (exceptionResponse !== null && typeof exceptionResponse === 'object') {
      const raw = exceptionResponse as Record<string, unknown>;

      if (Array.isArray(raw['message'])) {
        // class-validator produces an array of messages
        details = raw['message'] as unknown[];
        message = 'Validation failed';
      } else if (typeof raw['message'] === 'string') {
        message = raw['message'];
      }
    }

    // Only log 5xx errors as errors; 4xx are expected client mistakes
    if (httpStatus >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `[${request.method}] ${request.url} → ${httpStatus}`,
        exception instanceof Error ? exception.stack : String(exception),
      );
    } else {
      this.logger.warn(`[${request.method}] ${request.url} → ${httpStatus}: ${message}`);
    }

    const responseBody: ApiErrorResponse = {
      success: false,
      error: {
        code: HttpStatus[httpStatus] ?? 'UNKNOWN_ERROR',
        message,
        ...(details.length > 0 && { details }),
      },
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    response.status(httpStatus).json(responseBody);
  }
}
