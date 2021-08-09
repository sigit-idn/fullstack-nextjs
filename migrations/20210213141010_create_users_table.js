
exports.up = function(knex) {
  return knex.schema.createTable("users", table => 
  {
      table.increments();
      table.string('email');
      table.string('password');
      table.timestamp(true, true)
  })
};

exports.down = knex => knex.schema.dropTable('users');