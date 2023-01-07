import { Knex } from 'knex';
import { RoleEnum } from '../../../src/utils/enums/role.enum';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id');
    table.string('username').notNullable();
    table.enu('role', Object.values(RoleEnum)).notNullable();
    table.timestamps();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
