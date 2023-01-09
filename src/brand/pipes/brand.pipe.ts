import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { BrandDto } from '../dtos/brand.dto';
import { BrandService } from '../services/brand.service';

@Injectable()
export class BrandPipe implements PipeTransform {
  constructor(private readonly brandService: BrandService) {}
  async transform(brandInformation: BrandDto) {
    const { name } = brandInformation;
    // check if brand already exist
    const searchResult = await this.brandService.search({ name });
    if (searchResult.length > 0) {
      throw new ConflictException('brand with same name already exist');
    }
    return brandInformation;
  }
}
