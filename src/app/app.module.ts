import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { knexSnakeCaseMappers } from 'objection';
import { envConfigValidator } from 'src/config/config.validator';
import { EnvConfigEnum } from 'src/config/env.enum';
import { BaseModel } from '../../src/database/models/base.model';
import { UserModule } from 'src/user/user.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: false,
      validationSchema: envConfigValidator,
      envFilePath: ['.env'],
    }),

    ObjectionModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        const host = config.get(EnvConfigEnum.DB_HOST);
        const port = config.get(EnvConfigEnum.DB_PORT);
        const database = config.get(EnvConfigEnum.DB_NAME);
        const user = config.get(EnvConfigEnum.DB_USER);
        const password = config.get(EnvConfigEnum.DB_PASSWORD);
        const client = config.get(EnvConfigEnum.DB_CLIENT);
        const connectionOptions = {
          host,
          port,
          database,
          user,
          password,
        };
        Logger.debug(connectionOptions, null, 2);
        return {
          // You can specify a custom BaseModel
          // If none is provided, the default Model will be used
          // https://vincit.github.io/objection.js/#models
          Model: BaseModel,
          config: {
            client,
            connection: connectionOptions,
            ...knexSnakeCaseMappers(),
          },
        };
      },
    }),
    UserModule,
  ],
  exports: [ObjectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
