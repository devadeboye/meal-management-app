export class AddonCategoryDto {
  id?: number;
  name: string;
  brand: number;
}

export type AddonCategorySearchDto = Partial<AddonCategoryDto>;
