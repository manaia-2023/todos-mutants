import connection from './connection'
import { ToDoData } from '../../models/todoData'

const getTodos = () => {
  return connection('todos').select(['id', 'description'])
}

const addTodos = async (todo: ToDoData) => {
  const [todos] = await connection('todos').insert(todo).returning('*')
  return todos
}

const updateTodo = (todo: ToDoData) => {
  return connection('todos').where('todo.id', todo.id).update(todo)
}

const deleteTodos = (id: number) => {
  return connection('todos').del().where('id', id)
}

export { getTodos, addTodos, updateTodo, deleteTodos }
