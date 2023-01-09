import { Injectable, Inject } from '@nestjs/common';
import { UserDto, UserSearchDto } from '../dtos/user.dto';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  async createUser(userInformation: UserDto) {
    return await this.userModel.query().insert(userInformation).returning('*');
  }

  async fetchAll() {
    return await this.userModel.query().returning('*');
  }

  async search(query: UserSearchDto) {
    // TODO add option for pagination
    return await this.userModel.query().where(query).orderBy('createdAt');
  }
}
