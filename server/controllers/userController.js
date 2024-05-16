import User from '../models/userModel.js'
import bcrypt from 'bcrypt'

export const getAllUsers = async (req, res) => {
  try {
    // Order by most recent
    const users = await User.find({}).sort({ createdAt: -1 })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' })
  }

  try {
    const user = await User.findById({ _id: id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const updateUser = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' })
  }

  try {
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      req.body.password = hashedPassword
    }
    const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })

    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteUser = async (req, res) => {
  const id = req.params.id
  const tokenUserId = req.userId

  if (id !== tokenUserId) {
    return res.status(403).json({ message: 'Not Authorized!' })
  }

  try {
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json({ message: 'User deleted successfuly' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
