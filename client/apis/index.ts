import request from 'superagent'

const SSURL = 'http://localhost:3000'

// THIS ENDPOINT WILL CHANGE ONCE TAYNE AND BONNIE FINISH SERVERSIDE ROUTING
async function getTodos():Promise<Todo> {
  const data = await request.get(SSURL + '/api/v1/todos') 
  return data.body
}
