import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addoncategories', function (table) {
    table.increments('id');
    table.string('name').notNullable();
    table.timestamps({ defaultToNow: true, useTimestamps: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addoncategories');
}
