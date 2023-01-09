import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', function (table) {
    table.string('password').notNullable();
    table.string('salt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('users', function (table) {
    table.dropColumn('password');
    table.dropColumn('salt');
  });
}
