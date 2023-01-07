import { Body, Controller, Get, Post } from '@nestjs/common';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { UserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';
import { createUserValidator } from '../validators/user.validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  createUser(
    @Body(new JoiObjectValidationPipe(createUserValidator))
    userInformation: UserDto,
  ) {
    return this.userService.createUser(userInformation);
  }

  @Get('')
  fetchAll() {
    return this.userService.fetchAll();
  }
}
