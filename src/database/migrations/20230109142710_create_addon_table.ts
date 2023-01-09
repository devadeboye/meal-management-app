import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addons', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('description');
    table.integer('price').notNullable();

    table
      .integer('category')
      .unsigned()
      .references('id')
      .inTable('addoncategories')
      .onDelete('CASCADE');

    table
      .integer('brand')
      .unsigned()
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');
    table.timestamps({ defaultToNow: true, useTimestamps: true });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('addons');
}
