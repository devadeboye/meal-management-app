import { Inject, Injectable } from '@nestjs/common';
import {
  AddonCategoryDto,
  AddonCategorySearchDto,
} from '../dtos/addon-category.dto';
import { AddonCategory } from '../models/addon-category.model';

@Injectable()
export class AddonCategoryService {
  constructor(
    @Inject(AddonCategory)
    private readonly addonCategoryModel: typeof AddonCategory,
  ) {}

  async createCategory(categoryInformation: AddonCategoryDto) {
    return await this.addonCategoryModel
      .query()
      .insert(categoryInformation)
      .returning('*');
  }

  async search(query: AddonCategorySearchDto) {
    // TODO add option for pagination
    return await this.addonCategoryModel
      .query()
      .where(query)
      .orderBy('createdAt');
  }
}
