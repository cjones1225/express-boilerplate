
exports.up = function(knex, Promise) {
  return knex.schema.createTable("youdirtydog_user", (t)=>{
    t.increments('id').unsigned().primary();
    t.string("full_name").notNullable();
    t.string("user_name").notNullable();
    t.string('password').notNullable();
    t.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('youdirtydog_user');
};
