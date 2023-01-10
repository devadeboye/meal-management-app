import { Inject, Injectable } from '@nestjs/common';
import { AddonDto, AddonSearchDto } from '../dtos/addon.dto';
import { Addon } from '../models/addon.model';

@Injectable()
export class AddonService {
  constructor(@Inject(Addon) private readonly addonModel: typeof Addon) {}

  async createAddon(addon: AddonDto) {
    return await this.addonModel.query().insert(addon).returning('*');
  }

  async updateAddon(addon: AddonDto) {
    return await this.addonModel.query().update(addon).returning('*');
  }

  async deleteAddon(brand: number, id: number) {
    return await this.addonModel
      .query()
      .delete()
      .where({ brand, id })
      .returning('*');
  }

  async search(query: AddonSearchDto) {
    return await this.addonModel.query().where(query).orderBy('createdAt');
  }
}
