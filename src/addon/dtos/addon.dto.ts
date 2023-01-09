import { AddonCategory } from 'src/addon-category/models/addon-category.model';
import { Brand } from 'src/brand/models/brand.model';

export class AddonDto {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: AddonCategory;
  brand: Brand;
}

export type AddonSearchDto = Partial<AddonDto>;
