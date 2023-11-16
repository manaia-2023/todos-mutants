import { useState } from 'react'
import { getTodos } from '../apis/index'
import { useQuery } from '@tanstack/react-query'

function App() {
  // const [todos, setTodos] = useState()
  getTodos()
    .then((data) => console.log(data))
    .catch((err) => console.log(err))

  const { data, isLoading, isError } = useQuery({
    queryKey: ['placeholder'],
    queryFn: getTodos,
  })
  // if (isError) {
  //   return <div>There was an error while getting your todos</div>
  // }
  // if (!todosList || isLoading) {
  //   return <div>Loading your games...</div>
  // }
  return (
    <>
      <header className="header">
        <h1>My Collection</h1>
      </header>
      <section className="main">
        {isLoading && <h1>Loading..</h1>}
        {isError && <h1>Error..</h1>}
        {data &&
          data.map((todo: Todo) => <div key={todo.id}>{todo.description}</div>)}
      </section>
    </>
  )
}

export default App
