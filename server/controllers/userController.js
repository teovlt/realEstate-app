import User from '../models/userModel.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 })

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

export const getUser = async (req, res) => {
  const id = req.params.id

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
  res.send('Update user')
}

export const deleteUser = async (req, res) => {
  const id = req.params.id

  try {
    const user = await User.findOneAndDelete({ _id: id })
    if (!user) {
      return res.status(400).json({ error: 'No such user' })
    }
    res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
