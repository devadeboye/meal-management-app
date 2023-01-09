import { Test, TestingModule } from '@nestjs/testing';
import { AddonCategoryService } from './addon-category.service';

describe('AddonCategoryService', () => {
  let service: AddonCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddonCategoryService],
    }).compile();

    service = module.get<AddonCategoryService>(AddonCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
