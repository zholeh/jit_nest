import type { Knex } from 'knex';
import { dbConnection } from './src/infrastructure/helpers/dbConnection';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    connection: {
      connectionString: dbConnection(),
    },
  },
};

module.exports = config;
