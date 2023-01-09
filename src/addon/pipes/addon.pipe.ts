import {
  ArgumentMetadata,
  ConflictException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { AddonDto } from '../dtos/addon.dto';
import { AddonService } from '../services/addon.service';

@Injectable()
export class CreateAddonPipe implements PipeTransform {
  constructor(private readonly addonService: AddonService) {}
  async transform(addon: AddonDto) {
    const { name } = addon;
    // check if addon already exist
    const searchResult = await this.addonService.search({ name });
    if (searchResult.length > 0) {
      throw new ConflictException('addon with same name already exist');
    }
    return addon;
  }
}
