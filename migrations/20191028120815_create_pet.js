
exports.up = function(knex) {
  return knex.schema.createTable("youdirtydog_pet", (t) => {
    t.increments('id').unsigned().primary();
    t.string("name").notNull();
    t.integer('owner_id')
      .notNullable()
      .references('id')
      .inTable('youdirtydog_customer')
      .index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('youdirtydog_pet');
};
