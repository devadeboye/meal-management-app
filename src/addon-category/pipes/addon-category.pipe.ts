import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AddonCategoryDto } from '../dtos/addon-category.dto';
import { AddonCategoryService } from '../services/addon-category.service';

@Injectable()
export class CreateAddonCategoryPipe implements PipeTransform {
  constructor(private readonly addonCategoryService: AddonCategoryService) {}
  async transform(addonCategory: AddonCategoryDto) {
    const { name } = addonCategory;
    // check if addon category already exist
    const searchResult = await this.addonCategoryService.search({
      name,
    });
    if (searchResult.length > 0) {
      throw new ConflictException(
        'addon category with same name already exist',
      );
    }
    return addonCategory;
  }
}
