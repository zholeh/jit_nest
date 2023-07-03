import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuration } from './infrastructure/configuration';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  await app.listen(configuration.params.application.port);
}
bootstrap();
