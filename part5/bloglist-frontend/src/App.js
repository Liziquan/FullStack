import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login' 
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const [title,setTitle] =useState('')
  const [author,setAuthor] =useState('')
  const [url,setUrl] =useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const addBlog = (blogObject)=>{
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog=>{
        setBlogs(blogs.concat(returnedBlog))
      })    
  }
  const blogFormRef = useRef()
  
  const blogForm = ({addBlog}) => {
    return (
    <Togglable buttonLabel='create blog' ref={blogFormRef}>
      <BlogForm handleBlogCreate={addBlog}/>
    </Togglable>
    )
  }

  const handleLogin =  (event) =>{
    event.preventDefault()
    try {
      const user =  loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('name', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //setErrorMessage('Wrong credentials')
      setTimeout(() => {
      //  setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('name')
    setUser(null)
  }

  const handleNewCreate = () => {
    const newBlog={
      title:{title},
      author:{author},
      url:{url}
    }
    blogService.create(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <span>{user} logged in </span><button onClick={handleLogout}>log out</button>
      <blogForm addBlog={handleNewCreate} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App


