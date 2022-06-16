require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs.js')
const config = require('./utils/config.js')

const mongoUrl = config.MONGODB_URI
const port = config.PORT

mongoose.connect(mongoUrl).then(() => console.log("connected to MongoDB"))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})