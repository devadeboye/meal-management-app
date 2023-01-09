import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { AddonController } from './controllers/addon.controller';
import { Addon } from './models/addon.model';
import { AddonService } from './services/addon.service';

@Module({
  providers: [AddonService],
  exports: [AddonService],
  controllers: [AddonController],
  imports: [ObjectionModule.forFeature([Addon])],
})
export class AddonModule {}
