import { useState, ChangeEvent, FormEvent } from 'react'
import { getTodos } from '../apis/index'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ToDoData } from '../../models/todoData'
import { addTodos, deleteTodo, editTodos } from '../apis/index'

const initialForm = {
  description: '',
}
// interface Props{

// }

function App() {
  // const [todos, setTodos] = useState()

  const [showForm, setShowForm] = useState<number | null>(null)
  const [form, setForm] = useState<ToDoData>(initialForm)

  const queryClient = useQueryClient()


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    const newForm = { ...form, [name]: value }
    setForm(newForm)
  }

  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  })


  const addTodoMutation = useMutation({
    mutationFn: addTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const eidtToDoMutation = useMutation({
    mutationFn: () => editTodos({ id, newTodo:form }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const deleteTodoMutation = useMutation({
    mutationFn: () => deleteTodo({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  if (isError) {
    return <p>There was an error while getting your todos</p>
  }
  if (isLoading) {
    return <p>Loading your todos...</p>
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addTodoMutation.mutate(form)
  }

  function handleEditSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    eidtToDoMutation.mutate()
  }
  function handleDeleteSubmit(event: FormEvent<HTMLFormElement>,id) {
    event.preventDefault()
    deleteTodoMutation.mutate(id)
  }

  function handleEdit(id: number) {
    setShowForm(id)
  }

  return (
    <>
      <header className="header">
        <h1>MyTodo List</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={form.description}
        ></input>
        <button>Add Todos</button>
      </form>
      <section className="main">
        {todos &&
          todos.map((todo: ToDoData, index) => (
            <div key={index}>
              <li key={index}>{todo.description}</li>
              <button onClick={() => handleEdit(index)}>Edit</button>
              {showForm === index && (
                <form onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  ></input>
                  <button>Save</button>
                </form>
              )}
              <button onClick={(id)=>handleDeleteSubmit(id)}>Delete</button>
            </div>
          ))}
      </section>
    </>
  )
}

export default App