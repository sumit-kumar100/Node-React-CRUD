import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import connectDB from './config/connectdb.js'
import candidateRoutes from './routes/candidateRoutes.js'

const app = express()
const port = "8000" || process.env.PORT
const DATABASE_URL = "mongodb+srv://testdb:testdb@cluster0.mztf4vj.mongodb.net/?retryWrites=true&w=majority" || process.env.DATABASE_URL

// CORS Policy
app.use(cors())

// Connect Database
connectDB(DATABASE_URL)

// For Parsing application/json
app.use(express.json())

// Load Routes
app.use('/api', candidateRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})