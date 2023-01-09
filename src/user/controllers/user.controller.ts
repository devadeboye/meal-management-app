import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { TokenService } from 'src/auth/services/token.service';
import { AllowedRole } from 'src/utils/decorators/allowedPermissions.decorator';
import { RoleEnum } from 'src/utils/enums/role.enum';
import { JoiObjectValidationPipe } from 'src/utils/pipes/validation.pipe';
import { UserDto, UserLoginDto, UserSearchDto } from '../dtos/user.dto';
import { UserPipe } from '../pipes/user.pipe';
import { UserService } from '../services/user.service';
import {
  createUserValidator,
  loginValidator,
} from '../validators/user.validator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('add')
  createUser(
    @Body(new JoiObjectValidationPipe(createUserValidator), UserPipe)
    userInformation: UserDto,
  ) {
    return this.userService.createUser({
      ...userInformation,
      role: RoleEnum.USER,
    });
  }

  @Post('add-admin')
  @AllowedRole(RoleEnum.ADMIN)
  createAdmin(
    @Body(new JoiObjectValidationPipe(createUserValidator), UserPipe)
    userInformation: UserDto,
  ) {
    return this.userService.createUser({
      ...userInformation,
      role: RoleEnum.ADMIN,
    });
  }

  @Get('search')
  search(@Query() query: UserSearchDto) {
    return this.userService.search(query, ['id', 'username', 'role']);
  }

  @Post('login')
  async login(
    @Body(new JoiObjectValidationPipe(loginValidator))
    userLoginDetails: UserLoginDto,
  ) {
    const user = await this.userService.login(userLoginDetails);
    if (!user) throw new NotFoundException('user not found!');
    const { authorizationToken } = await this.tokenService.generateTokens(
      user.toJSON(),
    );
    Logger.debug(user, true);
    const { password, salt, ...rest } = user;
    return { user: rest, authorizationToken };
  }
}
