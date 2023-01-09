import { Knex } from 'knex';
import { RoleEnum } from '../../../../src/utils/enums/role.enum';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([
    {
      id: 1,
      username: 'devadeboye',
      password:
        '1f2b84579a824beac9e8a711bbbfcc561631a8c091fceaee105f009fa6dd0fb2b9fa46f6e49c3bb574bff2a914330d349bf6b0352161631770e8a2bf7697fd89',
      role: RoleEnum.ADMIN,
      salt: 'f63280b44a1c1836c0fb6b5639e46273',
    },
  ]);
}
