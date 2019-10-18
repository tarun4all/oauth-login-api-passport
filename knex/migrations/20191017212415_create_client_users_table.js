exports.up = (knex) => {
    return knex.schema.createTable('client_users', (t) => {
        t.increments('id').unsigned().primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
        t.string('name').notNull();
        t.string('contact').notNull();
        t.string('email').unique().notNull();
        t.string('password').notNull();
        t.boolean('first').notNull().defaultTo(true);
        t.uuid('company_id').references('id').inTable('companies');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('client_users');
};