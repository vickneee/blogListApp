import {useState} from "react";

const Blog = ({blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button style={showWhenVisible} onClick={toggleVisibility}>Hide</button>
      <button style={hideWhenVisible} onClick={toggleVisibility}>View</button>
      <div style={showWhenVisible}>
        <p>Blog url: {blog.url}</p>
        <p>Likes: {blog.likes} <button>like</button></p>
        {blog.user ? <p>{blog.user.name}</p> : <p>No user associated with this blog</p>}

      </div>
    </div>
  )
}

export default Blog