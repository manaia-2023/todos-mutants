export const seed = (knex) =>
  knex('todos')
    .del()
    .then(() =>
      knex('todos').insert([
        { id: 1, description: 'eat' },
        { id: 2, description: 'sleep' },
      ])
    )
