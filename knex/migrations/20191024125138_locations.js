exports.up = knex => knex.schema
  .createTable('locations', (table) => {
    table.uuid('id').primary();
    table.string('name', 255).notNullable();
    table.decimal('latitude', 15, 10).nullable();
    table.decimal('longitude', 15, 10).nullable();
    table.string('address1', 255).nullable();
    table.string('address2', 255).nullable();
    table.string('city', 255).nullable();
    table.string('state', 255).nullable();
    table.string('country', 255).nullable();
    table.string('zip_code', 10).nullable();
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
  });

exports.down = knex => knex.schema.dropTable('locations');
