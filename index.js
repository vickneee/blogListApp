const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {getHomePage, createBlog, getAllBlogs} = require("./controllers/blogController");

// Load env variables
dotenv.config()
app.use(cors())
app.use(express.json())

// MONGODB_URI
const MONGODB_URI = process.env.MONGODB_URI;
// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// Routes
app.get('/', getHomePage)
app.get('/api/blogs', getAllBlogs)
app.post('/api/blogs', createBlog)

// PORT 3003
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})