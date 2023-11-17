import express from 'express'
const router = express.Router()
import { addTodos, getTodos, updateTodo, deleteTodos } from '../db/db'
import { ToDoData } from '../../models/todoData'

router.get('/', async (req, res) => {
  try {
    const todos = await getTodos()
    // console.log(todos)

    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})

router.post('/', async (req, res) => {
  try {
    const todo = req.body as ToDoData

    const todos = await addTodos(todo)
    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const description = req.body.description
    const todos = await updateTodo(id, description)
    res.json(await todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})

router.delete('/:id', async (req, res) => {
  console.log(req.params.id);
  
  try {
    const id = Number(req.params.id)
    const todos = await deleteTodos(id)
    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Todo is n')
  }
})

export default router
