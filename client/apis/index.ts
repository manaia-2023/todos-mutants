import request from 'superagent'
import { Todo } from '../../server/models/db.ts'
import { ToDoData } from '../../models/todoData'
// const SSURL = 'http://localhost:3000'

// THIS ENDPOINT WILL CHANGE ONCE TAYNE AND BONNIE FINISH SERVERSIDE ROUTING
export async function getTodos(): Promise<Todo[]> {
  // const data = await request.get(SSURL + '/api/v1/todos')
  const data = await request.get('/api/v1/todos')

  // console.log(data)

  return data.body
}

export async function addTodos(newTodo: ToDoData) {
  const response = await request.post('/api/v1/todos').send(newTodo)
  console.log(response.body.description)
  return response.body.description
}
 
interface EditDescription{
  id: Todo['id']
  newDescription: Todo['description']
 }

export async function editTodos({
  id,
  newDescription,
}: EditDescription): Promise<void>{
 await request.patch(`/api/v1/todos/${id}`).send({description: newDescription})
}

interface DeleteTodo{
  id: Todo['id']
}

export async function deleteTodo({id}: DeleteTodo): Promise<void>{
  await request.delete(`/api/v1/todos/${id}`)
}


