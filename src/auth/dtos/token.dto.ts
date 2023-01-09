import { RoleEnum } from 'src/utils/enums/role.enum';

export class TokenDto {
  username: string;
  role: RoleEnum;
  user: number;
}
