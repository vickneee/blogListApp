import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs.jsx'
import LoginForm from "./components/LoginForm.jsx";
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
    } catch (exception) {
      console.log('Wrong credentials')
    }
  }

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} />

  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p> {/*Display the user's name*/}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App