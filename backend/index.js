const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const {getHomePage, createBlog, getAllBlogs, getSingleBlog, deleteBlog, updateBlog} = require("./controllers/blogController");
const {createUser, getAllUsers} = require("./controllers/userController");
const {loginUser} = require("./controllers/authController");
const checkToken = require('./utils/checkToken')

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
app.get('/', getHomePage);
app.get('/api/blogs', getAllBlogs);
app.get('/api/blogs/:id', getSingleBlog);
app.post('/api/blogs', checkToken, createBlog);
app.delete('/api/blogs/:id', deleteBlog);
app.put('/api/blogs/:id', updateBlog);
app.get('/api/users/', getAllUsers);
app.post('/api/users/', createUser);
app.post('/api/login', loginUser);

module.exports = app;

// PORT 3003
const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`)
})