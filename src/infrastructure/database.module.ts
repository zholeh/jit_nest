import { Logger, Module } from '@nestjs/common';
import { configuration } from './configuration';
import { dbConnection } from './helpers/dbConnection';
import { KnexModule } from 'nestjs-knex';

const {
  secrets: {
    db: { logging },
  },
} = configuration;
const logger = new Logger('DatabaseModule');
const log = logging
  ? {
      warn(message: unknown) {
        logger.log(message);
      },
      error(message: unknown) {
        logger.error(message);
      },
      deprecate(message: unknown) {
        logger.warn(message);
      },
      debug(message: unknown) {
        logger.debug(message);
      },
    }
  : undefined;

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'pg',
        connection: dbConnection(),
        debug: configuration.secrets.db.debug ?? false,
        log,
      },
    }),
  ],
})
export class DatabaseModule {}
