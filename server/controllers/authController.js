import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {}

export const register = async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    const userEmail = await User.findOne({
      email,
    })
    if (userEmail) {
      return res.status(400).json({ message: 'User with this email already exists' })
    }

    const userUsername = await User.findOne({
      username,
    })
    if (userUsername) {
      return res.status(400).json({ message: 'User with this username already exists' })
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      message: 'User created successfully',
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  console.log('logout')
}
