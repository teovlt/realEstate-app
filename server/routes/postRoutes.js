import Express from 'express'
import { verifyToken } from '../middleware/verifyToken.js'
import { createPost } from '../controllers/postController.js'

const router = Express.Router()

router.post('/new', verifyToken, createPost)

export default router
