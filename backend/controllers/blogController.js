const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const express = require("express");
const jwt = require('jsonwebtoken');

const app = express();

// Get home page
const getHomePage = app.get('/', async (request, response) => {
  try {
    await response.send('<h1>Welcome to BlogList App!</h1>');
  } catch (error) {
    console.log(error);
  }
})

// Get all blogs
const getAllBlogs = app.get('/api/blogs', async (request, response) => {
  try {
    const blogs = await Blog.find({});
    response.json(blogs);
  } catch (error) {
    console.log(error);
  }
})

// Get a single blog
const getSingleBlog = app.get('/api/blogs/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    console.log(error);
  }
});

// Create a new blog
const createBlog = app.post('/api/blogs', async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'});
  }

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    return response.status(400).json({error: 'title or url missing'});
  }

  try {
    const newBlog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: {
        _id: user._id,
        username: user.username,
        name: user.name
      } // assign the user as the creator of the blog
    });

    const savedBlog = await newBlog.save();

    // Add the blog to the user's list of blogs
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
  } catch (error) {
    console.log(error);
    response.status(500).json({error: "An Error occurred while creating the blog"});
  }
})

// Delete a blog
const deleteBlog = app.delete('/api/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({error: 'token missing or invalid'});
  }

  const user = await User.findById(decodedToken.id);
  if (!user) {
    return response.status(401).json({error: 'user not found'});
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).send({error: 'blog not found'});
  }

  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: 'unauthorized user'});
  }

  try {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

// Update a blog
const updateBlog = app.put('/api/blogs/:id', async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.json(updatedBlog);
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  getHomePage,
  getAllBlogs,
  getSingleBlog,
  createBlog,
  deleteBlog,
  updateBlog
}