import { Injectable, Inject } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  async createUser(userInformation: UserDto) {
    return await this.userModel.query().insert(userInformation).returning('*');
  }

  async fetchAll() {
    return await this.userModel.query().returning('*');
  }
}
