import { Inject, Injectable } from '@nestjs/common';
import { BrandDto, BrandSearchDto } from '../dtos/brand.dto';
import { Brand } from '../models/brand.model';

@Injectable()
export class BrandService {
  constructor(@Inject(Brand) private readonly brandModel: typeof Brand) {}

  async createBrand(brandInformation: BrandDto) {
    return await this.brandModel
      .query()
      .insert(brandInformation)
      .returning('*');
  }

  async search(query: BrandSearchDto) {
    // TODO add option for pagination
    return await this.brandModel.query().where(query).orderBy('createdAt');
  }
}
