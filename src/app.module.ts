import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { configuration } from './infrastructure/configuration';
import { GqlModule } from './api/gql.module';

@Module({
  imports: [
    GqlModule,
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'main',
        level: configuration.params.logger.level,
        transport: configuration.params.logger.transport,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
