import {useState} from "react";
import blogService from "../services/blogs";

const Blog = ({blog: initialBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blog, setBlog] = useState(initialBlog)

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1 // Increment the likes by 1
    }

    await blogService.updateLikes(blog.id, updatedBlog) // Update the likes in the backend
    setBlog(updatedBlog) // Update the likes in the frontend
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
      <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
      <div style={showWhenVisible}>
        <p>Blog url: {blog.url}</p>
        <p>Likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user.name}</p>

      </div>
    </div>
  )
}

export default Blog