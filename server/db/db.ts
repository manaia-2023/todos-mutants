import connection from './connection'
import { ToDoData } from '../../models/todoData'

const getTodos = () => {
  return connection('todos').select(['id', 'description'])
}

const addTodos = async (todo: ToDoData) => {
  const [todos] = await connection('todos').insert(todo).returning('*')
  console.log(todos)
  return todos
}

const updateTodo = (id: number, description: string) => {
  return connection('todos').where({id: id}).update({description})
}

const deleteTodos = (id: number) => {
  return connection('todos').del().where('id', id)
}

export { getTodos, addTodos, updateTodo, deleteTodos }
