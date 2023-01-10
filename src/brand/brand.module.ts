import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AddonCategory } from 'src/addon-category/models/addon-category.model';
import { AddonCategoryService } from 'src/addon-category/services/addon-category.service';
import { Addon } from 'src/addon/models/addon.model';
import { AddonService } from 'src/addon/services/addon.service';
import { BrandController } from './controllers/brand.controller';
import { Brand } from './models/brand.model';
import { BrandService } from './services/brand.service';

@Module({
  controllers: [BrandController],
  providers: [BrandService, AddonService, AddonCategoryService],
  imports: [ObjectionModule.forFeature([Brand, Addon, AddonCategory])],
  exports: [BrandService, AddonService, AddonCategoryService],
})
export class BrandModule {}
