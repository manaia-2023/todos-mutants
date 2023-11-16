import express from 'express'
const router = express.Router()
import { addTodos, getTodos } from '../db/db'

router.get('/', async (req, res) => {
  try {
    const todos = await getTodos()
    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})

router.post('/', async (req, res) => {
  try {
    const {todo} = req.body
    const todos = await addTodos(todo)
    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})


export default router