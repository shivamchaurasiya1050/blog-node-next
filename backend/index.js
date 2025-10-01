require('dotenv').config()
const express = require("express")
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { rateLimit } = require("express-rate-limit")
const path = require("path")
const app = express()
const PORT = process.env.PORT || 5000
const userRoute = require('./routes/userRoutes')
const uploadRouter = require('./routes/uploadRoute')
const error = require('./middlewares/error')


// middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())


app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')))
// sample routes
app.get('/', (req, res) => {
    return res.status(200).json({ message: "Hello from index!" })
})

// routes
app.use('/api/auth', userRoute)
// app.use('/api/file', uploadRouter)


// Error handler
app.use(error)

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`)
})
