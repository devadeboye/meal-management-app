import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserController } from './controllers/user.controller';
import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    //Register your objection models so it can be provided when needed.
    ObjectionModule.forFeature([User]),
  ],
  exports: [UserService],
})
export class UserModule {}
