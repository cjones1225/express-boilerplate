
exports.up = function(knex) {
  return knex.schema.createTable("youdirtydog_customer", (t) => {
    t.increments('id').unsigned().primary();
    t.string("full_name").notNull();
    t.string("phone_number").notNull();
    t.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('youdirtydog_user')
      .index();
    t.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('youdirtydog_customer');
};
