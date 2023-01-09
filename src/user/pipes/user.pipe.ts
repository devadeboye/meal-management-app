import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@Injectable()
export class UserPipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}
  async transform(userInformation: UserDto) {
    const { username } = userInformation;
    // check if user already exist
    const searchResult = await this.userService.search({ username });
    if (searchResult.length > 0) {
      throw new ConflictException('user with same username already exist');
    }
    return userInformation;
  }
}
