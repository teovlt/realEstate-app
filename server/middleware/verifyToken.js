import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ message: 'Not Authenticated' })

  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).json({ message: 'Access Token is invalid' })
    req.userId = payload.id

    next()
  })
}
