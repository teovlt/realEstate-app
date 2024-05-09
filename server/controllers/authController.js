import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: maxAge + 'ms' })
}

export const login = async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Please fill in all fields' })
  }

  try {
    const user = await User.findOne({
      username,
    })

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = createToken(user._id)
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge, sameSite: 'Lax', secure: true })

    return res.status(200).json({ user: { id: user._id, username: user.username, email: user.email }, message: 'Logged in successfully' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

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

    const token = createToken(user._id)
    res.cookie('token', token, { httpOnly: true, maxAge: maxAge, sameSite: 'Lax', secure: true })

    return res.status(201).json({
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
  res.clearCookie('token')
  return res.status(200).json({ message: 'Logged out successfully' })
}
