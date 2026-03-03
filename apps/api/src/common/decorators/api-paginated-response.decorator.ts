import { applyDecorators, type Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

/**
 * Combines @ApiExtraModels + @ApiOkResponse to document paginated list endpoints.
 *
 * @example
 * ```ts
 * @ApiPaginatedResponse(UserDto)
 * @Get()
 * findAll(): Promise<PaginatedResponse<UserDto>> { ... }
 * ```
 */
export const ApiPaginatedResponse = <TModel extends Type<unknown>>(
  model: TModel,
): MethodDecorator =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      description: 'Paginated list response',
      schema: {
        allOf: [
          {
            properties: {
              success: { type: 'boolean', example: true },
              data: {
                type: 'object',
                properties: {
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                  meta: {
                    type: 'object',
                    properties: {
                      page: { type: 'number', example: 1 },
                      limit: { type: 'number', example: 10 },
                      total: { type: 'number', example: 100 },
                      totalPages: { type: 'number', example: 10 },
                      hasNextPage: { type: 'boolean', example: true },
                      hasPreviousPage: { type: 'boolean', example: false },
                    },
                  },
                },
              },
              message: { type: 'string', example: 'Success' },
              statusCode: { type: 'number', example: 200 },
              timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
              path: { type: 'string', example: '/api/v1/users' },
            },
          },
        ],
      },
    }),
  );
