import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AddonCategoryDto } from 'src/addon-category/dtos/addon-category.dto';
import { CreateAddonCategoryPipe } from 'src/addon-category/pipes/addon-category.pipe';
import { AddonCategoryService } from 'src/addon-category/services/addon-category.service';
import { createAddonCategoryValidator } from 'src/addon-category/validators/addon-category.validator';
import { AddonDto } from 'src/addon/dtos/addon.dto';
import { CreateAddonPipe, UpdateAddonPipe } from 'src/addon/pipes/addon.pipe';
import { AddonService } from 'src/addon/services/addon.service';
import {
  createAddonValidator,
  updateAddonValidator,
} from 'src/addon/validators/addon.validator';
import { AllowedRole } from 'src/utils/decorators/allowedPermissions.decorator';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { BrandDto, BrandSearchDto } from '../dtos/brand.dto';
import { BrandPipe } from '../pipes/brand.pipe';
import { BrandService } from '../services/brand.service';
import { createBrandValidator } from '../validators/brand.validator';

@Controller('brands')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly addonService: AddonService,
    private readonly addonCategoryService: AddonCategoryService,
  ) {}

  @Post('add')
  @AllowedRole(RoleEnum.ADMIN)
  createBrand(
    @Body(new JoiObjectValidationPipe(createBrandValidator), BrandPipe)
    brandInformation: BrandDto,
  ) {
    return this.brandService.createBrand(brandInformation);
  }

  @Get('search')
  search(@Query() query: BrandSearchDto) {
    return this.brandService.search(query);
  }

  @Post(':brandId/addons')
  @AllowedRole(RoleEnum.ADMIN)
  createAddon(
    @Param('brandId') brand: number,
    @Body(new JoiObjectValidationPipe(createAddonValidator), CreateAddonPipe)
    addon: AddonDto,
  ) {
    return this.addonService.createAddon({ ...addon, brand });
  }

  @Get(':brandId/addons')
  @AllowedRole(RoleEnum.ADMIN)
  fetchAddonsByBrand(@Param('brandId') brand: number) {
    return this.addonService.search({ brand });
  }

  @Get(':brandId/addons/:addonId')
  @AllowedRole(RoleEnum.ADMIN)
  fetchAddonsById(
    @Param('brandId') brand: number,
    @Param('addonId') id: number,
  ) {
    return this.addonService.search({ brand, id });
  }

  @Patch(':brandId/addons/:addonId')
  @AllowedRole(RoleEnum.ADMIN)
  updateAddonsById(
    @Param('brandId') brand: number,
    @Param('addonId') id: number,
    @Body(new JoiObjectValidationPipe(updateAddonValidator), UpdateAddonPipe)
    addon: AddonDto,
  ) {
    return this.addonService.updateAddon(addon);
  }

  @Delete(':brandId/addons/:addonId')
  @AllowedRole(RoleEnum.ADMIN)
  deleteAddonsById(
    @Param('brandId') brand: number,
    @Param('addonId') id: number,
  ) {
    return this.addonService.deleteAddon(brand, id);
  }

  @Post(':brandId/addon-categories')
  @AllowedRole(RoleEnum.ADMIN)
  createAddonCategory(
    @Param('brandId') brand: number,
    @Body(
      new JoiObjectValidationPipe(createAddonCategoryValidator),
      CreateAddonCategoryPipe,
    )
    addonCategory: AddonCategoryDto,
  ) {
    return this.addonCategoryService.createCategory({
      ...addonCategory,
      brand: Number(brand),
    });
  }
}
