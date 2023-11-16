import connection from './connection'
import { ToDoData } from '../../models/todoData'

  const getTodos = () => {
  return connection('todos').select('*')
}

const addTodos =async(todo: ToDoData)=>{
const [todos] = await connection('todos').insert(todo).returning('*')
return todos
}

const deleteTodos = (id) => {
  
}

// const updat
// Todos = 

export { getTodos , addTodos}

