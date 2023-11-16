import express from 'express'
const router = express.Router()
import { getTodos } from '../db/db'

router.get('/', async (req, res) => {
  try {
    const todos = await getTodos()
    res.json(todos)
    res.status(200)
  } catch (e) {
    res.status(500).send('Could not get todos')
  }
})

export default router