import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import knex, { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';
import { EnvConfigEnum } from 'src/config/env.enum';

@Module({
  imports: [
    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          // You can specify a custom BaseModel
          // If none is provided, the default Model will be used
          // https://vincit.github.io/objection.js/#models
          config: {
            client: 'pg',
            connection: {
              host: '127.0.0.1',
              port: 5432,
              database: 'meal-management-app',
              user: 'postgres',
            },
            // connection: config.get(EnvConfigEnum.CONNECTION_STRING),
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
    //Register your objection models so it can be provided when needed.
    // ObjectionModule.forFeature([User]),
  ],
  exports: [ObjectionModule],
})
export class DatabaseModule {}
