import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AllowedRole } from 'src/utils/decorators/allowedPermissions.decorator';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { BrandDto, BrandSearchDto } from '../dtos/brand.dto';
import { BrandPipe } from '../pipes/brand.pipe';
import { BrandService } from '../services/brand.service';
import { createBrandValidator } from '../validators/brand.validator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

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
}
