import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { BrandController } from './controllers/brand.controller';
import { Brand } from './models/brand.model';
import { BrandService } from './services/brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService],
  imports: [
    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([Brand]),
  ],
  exports: [BrandService],
})
export class BrandModule {}
