import type { Knex } from 'knex';
import { EnvConfigEnum } from './src/config/env.enum';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import

dotenv.config();
const host = process.env[EnvConfigEnum.DB_HOST];
const port = Number(process.env[EnvConfigEnum.DB_PORT]);
const database = process.env[EnvConfigEnum.DB_NAME];
const user = process.env[EnvConfigEnum.DB_USER];
const password = process.env[EnvConfigEnum.DB_PASSWORD];
const client = process.env[EnvConfigEnum.DB_CLIENT];

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
  },
};

module.exports = config;
