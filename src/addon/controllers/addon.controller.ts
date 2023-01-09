import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AllowedRole } from 'src/utils/decorators/allowedPermissions.decorator';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { AddonDto, AddonSearchDto } from '../dtos/addon.dto';
import { CreateAddonPipe } from '../pipes/addon.pipe';
import { AddonService } from '../services/addon.service';
import { createAddonValidator } from '../validators/addon.validator';

@Controller('addon')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post('add')
  @AllowedRole(RoleEnum.ADMIN)
  createBrand(
    @Body(new JoiObjectValidationPipe(createAddonValidator), CreateAddonPipe)
    addon: AddonDto,
  ) {
    return this.addonService.createAddon(addon);
  }

  @Get('search')
  search(@Query() query: AddonSearchDto) {
    return this.addonService.search(query);
  }
}
