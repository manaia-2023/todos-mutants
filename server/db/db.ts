import connection from './connection'

const getTodos = () => {
  return connection('todos').select('*')
}

export { getTodos }
