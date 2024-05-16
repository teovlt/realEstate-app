import Express from 'express'
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/userController.js'
import { verifyToken } from '../middleware/verifyToken.js'

const router = Express.Router()

router.get('/', getAllUsers)
router.get('/:id', verifyToken, getUser)
router.put('/:id', verifyToken, updateUser)
router.delete('/:id', verifyToken, deleteUser)

export default router
