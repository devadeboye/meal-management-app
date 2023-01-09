import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { BrandDto } from '../dtos/brand.dto';
import { BrandService } from '../services/brand.service';
import { createBrandValidator } from '../validators/brand.validator';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post('add')
  createBrand(
    @Body(new JoiObjectValidationPipe(createBrandValidator))
    brandInformation: BrandDto,
  ) {
    return this.brandService.createBrand(brandInformation);
  }

  @Get('')
  fetchAll() {
    return this.brandService.fetchAll();
  }
}
