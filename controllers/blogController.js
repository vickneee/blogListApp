const Blog = require("../models/blogModel");
const express = require("express");

const app = express();

const getHomePage = app.get('/', async (request, response) => {
  try {
    await response.send('<h1>Welcome to BlogList App!</h1>');
  } catch (error) {
    console.log(error);
  }
})

const getAllBlogs = app.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  }
  catch (error) {
    console.log(error);
  }
})

const createBlog = app.post('/api/blogs', async (request, response) => {
  try {
    if (!request.body.title || !request.body.author || !request.body.url) {
      return response.status(400).json({ error: 'missing title, author or url' })
    }
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
  catch (error) {
    console.log(error);
  }
})

module.exports = {
  getHomePage,
  getAllBlogs,
  createBlog
}