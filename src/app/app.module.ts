import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfigValidator } from 'src/config/config.validator';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
