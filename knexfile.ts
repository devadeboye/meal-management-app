import type { Knex } from 'knex';
import { EnvConfigEnum } from './src/config/env.enum';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

const envPath = `${__dirname}/.env`;
dotenv.config({ path: envPath });

const host = process.env[EnvConfigEnum.DB_HOST];
const port = Number(process.env[EnvConfigEnum.DB_PORT]);
const database = process.env[EnvConfigEnum.DB_NAME];
const user = process.env[EnvConfigEnum.DB_USER];
const password = process.env[EnvConfigEnum.DB_PASSWORD];
const client = process.env[EnvConfigEnum.DB_CLIENT];

Logger.debug(
  {
    host,
    port,
    user,
    password,
    database,
  },
  'migration database config',
);

// Update with your config settings.
const config: { [key: string]: Knex.Config } = {
  development: {
    client,
    connection: {
      host,
      port,
      user,
      password,
      database,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds/dev',
    },
  },
};

module.exports = config;
