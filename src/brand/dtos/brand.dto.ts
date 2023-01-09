export class BrandDto {
  id?: number;
  name: string;
}

export type BrandSearchDto = Partial<BrandDto>;
