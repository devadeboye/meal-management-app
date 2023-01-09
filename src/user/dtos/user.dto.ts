import { RoleEnum } from 'src/utils/enums/role.enum';

export class UserDto {
  id?: number;
  username: string;
  role: RoleEnum;
}

export type UserSearchDto = Partial<UserDto>;
