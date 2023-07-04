import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './infrastructure/configuration';
import { Logger as LoggerPino } from 'nestjs-pino';
import { Logger, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(LoggerPino));
  const logger = new Logger();

  if (configuration.params.application.origin) {
    logger.log(`Accepting requests from origin "${configuration.params.application.origin}"`);
    app.enableCors({ origin: configuration.params.application.origin });
  }

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('Bid-marketplace API')
    .setDescription('Bid-marketplace API')
    .setVersion('1.0')
    .addTag('Bid-marketplace')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, document);

  process.on('unhandledRejection', (reason: unknown, p: unknown) => {
    logger.error(`Unhandled Rejection at: Promise: ${p}, reason: ${reason}`);
    // process.abort();
  });
  process.on('uncaughtException', (err: unknown, origin: unknown) => {
    logger.error(`Unhandled Exception at: ${err}: err, origin: ${origin}`);
    // process.abort();
  });
  await app.listen(configuration.params.application.port, configuration.params.application.address);
}
bootstrap();
