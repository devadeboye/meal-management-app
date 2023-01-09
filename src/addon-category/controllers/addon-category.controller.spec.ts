import { Test, TestingModule } from '@nestjs/testing';
import { AddonCategoryController } from './addon-category.controller';

describe('AddonCategoryController', () => {
  let controller: AddonCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AddonCategoryController],
    }).compile();

    controller = module.get<AddonCategoryController>(AddonCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
