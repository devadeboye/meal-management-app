import { Module } from '@nestjs/common';
import { ObjectionModule } from '@willsoto/nestjs-objection';
import { UserController } from './controller/user.controller';
import { User } from './model/user.model';
import { UserService } from './service/user.service';

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
