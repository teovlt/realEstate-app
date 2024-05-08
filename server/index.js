import Express from 'express'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import { connectToDatabase } from './database/connectToDB.js'
import cookieParser from 'cookie-parser'

//Express app
const app = Express()

//Middleware
dotenv.config()
app.use(Express.json())
app.use(cookieParser())

//Endpoints
app.use('/api/auth', authRoutes)

//Server
app.listen(process.env.PORT, () => {
  connectToDatabase()
  console.log(`Server is running on port ${process.env.PORT} 🚀`)
})
