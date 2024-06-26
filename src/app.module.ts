import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from 'nestjs-pino';
import { configuration } from './infrastructure/configuration';
import { GqlModule } from './api/gql/gql.module';
import { RestModule } from './api/rest/rest.module';

@Module({
  imports: [
    GqlModule,
    RestModule,
    LoggerModule.forRoot({
      pinoHttp: {
        name: 'JIT',
        level: configuration.params.logger.level,
        transport: configuration.params.logger.transport,
        autoLogging: configuration.params.logger.autoLogging,
        quietReqLogger: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
