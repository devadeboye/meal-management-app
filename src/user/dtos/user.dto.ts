import { RoleEnum } from 'src/utils/enums/role.enum';

export class UserDto {
  id?: number;
  username: string;
  role: RoleEnum;
  password: string;
  salt: string;
}

export type UserSearchDto = Partial<UserDto>;

export class UserLoginDto {
  username: string;
  password: string;
}
