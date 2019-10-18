
exports.up = function(knex) {
    return knex.schema.createTable('companies', (t) => {
        t.uuid('id').primary();
        t.dateTime('createdAt').notNull();
        t.dateTime('updatedAt').nullable();
        t.dateTime('deletedAt').nullable();
        t.string('name').notNull();
        t.string('contact').notNull();
        t.string('email').unique().notNull();
        t.string('password').notNull();
        t.string('domain').defaultTo('[]');
        t.string('appKey');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('companies');
};
