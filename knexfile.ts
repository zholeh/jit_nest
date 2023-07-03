import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'ls',
      user: 'icfcusr',
      password: 'password',
    },
    migrations: {
      tableName: 'migration',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'ls',
      user: 'icfcusr',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migration',
    },
  },
};

module.exports = config;
