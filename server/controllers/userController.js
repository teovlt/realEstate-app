import User from '../models/userModel.js'

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()

    if (!users) {
      return res.status(404).json({ message: 'No users found' })
    }

    return res.status(200).json(users)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

export const getUser = async (req, res) => {
  res.send('Get user')
}

export const updateUser = async (req, res) => {
  res.send('Update user')
}

export const deleteUser = async (req, res) => {
  res.send('Delete user')
}
