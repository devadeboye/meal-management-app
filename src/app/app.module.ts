import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { knexSnakeCaseMappers } from 'objection';
import { envConfigValidator } from 'src/config/config.validator';
import { EnvConfigEnum } from 'src/config/env.enum';
import { BaseModel } from '../../src/database/models/base.model';
import { UserModule } from 'src/user/user.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { BrandModule } from 'src/brand/brand.module';
import { TokenMiddleware } from 'src/utils/middlewares/token.middleware';
import { AuthModule } from 'src/auth/auth.module';

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
    BrandModule,
    AuthModule,
  ],
  exports: [ObjectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    return consumer
      .apply(TokenMiddleware)
      .exclude({
        path: 'login',
        method: RequestMethod.POST,
      })
      .forRoutes({
        path: '*',
        method: RequestMethod.ALL,
      });
  }
}
