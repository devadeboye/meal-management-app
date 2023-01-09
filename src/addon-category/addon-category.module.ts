import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AddonCategoryController } from './controllers/addon-category.controller';
import { AddonCategory } from './models/addon-category.model';
import { AddonCategoryService } from './services/addon-category.service';

@Module({
  providers: [AddonCategoryService],
  controllers: [AddonCategoryController],
  exports: [AddonCategoryService],
  imports: [ObjectionModule.forFeature([AddonCategory])],
})
export class AddonCategoryModule {}
