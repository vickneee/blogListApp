import {useState, useEffect} from 'react'
import Blog from './components/Blog'
import LoginForm from "./components/LoginForm.jsx";
import CreateBlogForm from "./components/CreateBlogForm.jsx";
import blogService from './services/blogs.jsx'
import loginService from './services/login'
import {useRef} from 'react'
import Toggle from "./components/Toggle.jsx";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser') // Get the user from local storage
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) // Save the user to local storage
      setUser(user)
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser') // Remove the user from local storage
    setUser(null) //Set the user to null
  }

  const handleCreate = async (blog, token) => {
    try {
      const newBlog = await blogService.create(blog, token)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility() // Close the form after creating a blog
    } catch (exception) {
      console.log('Error creating blog', exception)
    }
  }

  const blogFormRef = useRef() // Create a reference to the blog form

  if (user === null) {
    return <LoginForm handleLogin={handleLogin}/>
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in {/*Display the user's name*/}
        <button onClick={handleLogout}>Logout</button>
      </p>
      {/*Add logout button*/}
      <Toggle buttonLabel="Create new blog" ref={blogFormRef}> // Toggle props.buttonLabel to "Create new blog"
        <CreateBlogForm handleCreate={handleCreate} user={user}/><br></br>
      </Toggle><br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )
}

export default App