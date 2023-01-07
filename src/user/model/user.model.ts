import { BaseModel } from 'src/database/models/base.model';
import { RoleEnum } from 'src/utils/enums/role.enum';

export class User extends BaseModel {
  username: string;
  role: RoleEnum;

  static tableName = 'users';

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['username', 'role'],
      properties: {
        id: { type: 'integer' },
        username: { type: 'string', minLength: 5, maxLength: 255 },
        role: { type: 'enum', minLength: 3, maxLength: 255 },
      },
    };
  }
}
