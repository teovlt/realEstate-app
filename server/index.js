import Express from 'express'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import { connectToDatabase } from './database/connectToDB.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

//Express app
const app = Express()

//Middleware
dotenv.config()
app.use(Express.json())
app.use(cookieParser())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))

//Endpoints
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/post', postRoutes)

//Server
app.listen(process.env.PORT, () => {
  connectToDatabase()
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
})
