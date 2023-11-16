export function up(knex) {
  return knex.schema.createTable('todos', function (table) {
    table.increments('id').primary()
    table.string('description')
  })
}

export function down(knex) {
  return knex.schema.dropTable('todos')
}
