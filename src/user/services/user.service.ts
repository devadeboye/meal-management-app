import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { UserDto, UserLoginDto, UserSearchDto } from '../dtos/user.dto';
import { User } from '../models/user.model';
import { randomBytes, pbkdf2Sync } from 'crypto';

@Injectable()
export class UserService {
  constructor(@Inject(User) private readonly userModel: typeof User) {}

  async createUser(userInformation: UserDto) {
    const { password } = userInformation;
    const { hash: hashedPassword, salt } = await this.hashPassword(password);
    const user = await this.userModel
      .query()
      .insert({ ...userInformation, salt, password: hashedPassword });
    return { id: user.id, username: user.username, role: user.role };
  }

  async search(query: UserSearchDto, select: string[] = []) {
    // TODO add option for pagination
    return await this.userModel
      .query()
      .select(select)
      .where(query)
      .orderBy('createdAt');
  }

  async login(loginCredentials: UserLoginDto) {
    const { password, username } = loginCredentials;
    const user = await this.userModel.query().findOne({ username });

    if (!user) return undefined;
    const isValidPassword = await this.validatePassword(
      password,
      user.salt,
      user.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException(
        'Invalid credentials, kindly check your details again',
      );
    }
    return user;
  }

  async hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    // Hashing user's salt and password with 1000 iterations,
    //     64 length and sha512 digest
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return { hash, salt };
  }

  async validatePassword(password: string, salt: string, savedHash: string) {
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return hash === savedHash;
  }
}
