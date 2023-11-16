import request from 'superagent'
import { Todo } from '../../server/models/db.ts'
// const SSURL = 'http://localhost:3000'

// THIS ENDPOINT WILL CHANGE ONCE TAYNE AND BONNIE FINISH SERVERSIDE ROUTING
export async function getTodos(): Promise<Todo[]> {
  // const data = await request.get(SSURL + '/api/v1/todos')
  const data = await request.get('/api/v1/todos')
  /* console.log(data) */
  return data.body
}

// const serverUrl = '/api/v1/todos'

// GET /api/v1/todos
// export async function fetchTodos(): Promise<Todo[]>{
//   const response = await request.get(serverUrl)
//   return response.body.todos
// }
