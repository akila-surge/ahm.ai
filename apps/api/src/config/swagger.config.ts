import { type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { type AppConfig } from './app.config';

export function setupSwagger(app: INestApplication, config: AppConfig): void {
  const documentConfig = new DocumentBuilder()
    .setTitle(config.name)
    .setDescription(
      `**${config.name}** — REST API Documentation\n\n` +
        `All endpoints follow the \`/api/v{version}/{resource}\` convention.\n\n` +
        `Responses are wrapped in a standard envelope: \`{ success, data, message, statusCode, timestamp, path }\`.`,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter your JWT access token',
        in: 'header',
      },
      'bearer',
    )
    .addServer(`http://localhost:${config.port}`, 'Local Development')
    .setContact('Sears Team', '', 'dev@sears.com')
    .build();

  const document = SwaggerModule.createDocument(app, documentConfig);

  SwaggerModule.setup(config.swaggerPath, app, document, {
    customSiteTitle: `${config.name} — API Docs`,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'none',
      filter: true,
      showRequestDuration: true,
    },
  });
}
