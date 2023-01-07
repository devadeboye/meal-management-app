import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  createUser(@Body() userInformation: UserDto) {
    return this.userService.createUser(userInformation);
  }
}
