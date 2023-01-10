import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('addoncategories', function (table) {
    table.integer('brand').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('addoncategories', function (table) {
    table.dropColumn('brand');
  });
}
