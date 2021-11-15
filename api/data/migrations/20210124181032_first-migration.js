exports.up = async (knex) => {
  await knex.schema
    .createTable("user_role", (roles) => {
      roles.increments("role_id");
      roles.string("role_type").notNullable();
    })
    .createTable("users", (users) => {
      users.increments("user_id");
      users.string("username", 200).notNullable();
      users.string("password", 200).notNullable();
      users
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("role_id")
        .inTable("user_role")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      users.timestamps(false, true);
    });
};

exports.down = async (knex) => {
  return knex.schema
  .dropTableIfExists("users")
  .dropTableIfExists("user_role")
};
