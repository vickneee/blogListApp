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

const getAllBlogs = app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

const createBlog = app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = {
  getHomePage,
  getAllBlogs,
  createBlog
}