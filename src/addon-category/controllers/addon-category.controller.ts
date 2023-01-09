import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import {
  AddonCategoryDto,
  AddonCategorySearchDto,
} from '../dtos/addon-category.dto';
import { CreateAddonCategoryPipe } from '../pipes/addon-category.pipe';
import { AddonCategoryService } from '../services/addon-category.service';
import { createAddonCategoryValidator } from '../validators/addon-category.validator';

@Controller('addon-category')
export class AddonCategoryController {
  constructor(private readonly addonCategoryService: AddonCategoryService) {}

  @Post('add')
  createCategory(
    @Body(
      new JoiObjectValidationPipe(createAddonCategoryValidator),
      CreateAddonCategoryPipe,
    )
    addonCategory: AddonCategoryDto,
  ) {
    return this.addonCategoryService.createCategory(addonCategory);
  }

  @Get('search')
  search(@Query() query: AddonCategorySearchDto) {
    return this.addonCategoryService.search(query);
  }
}
