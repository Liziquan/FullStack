import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs,setBlogs] = useState([])

  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [newTitle,setNewTitle] =useState('')
  const [newAuthor,setNewAuthor] =useState('')
  const [newUrl,setNewUrl] =useState('')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialblogs => {
        setBlogs( initialblogs )
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject ={
      title:newTitle,
      author:newAuthor,
      url:newUrl
    }
    await blogService.create(blogObject)
    const updatedBlogs = await blogService.getAll()
    setBlogs(updatedBlogs)
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user =  await loginService.login({
        username, password,
      })
      console.log('after login')
      console.log(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      //setTimeout(() => {
      //  setErrorMessage(null)
      //}, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUsername('')
    setPassword('')
    setUser(null)
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogFormRef= useRef()
  const blogForm = () => (
    <Togglable buttonLabel="create" ref={blogFormRef}>
      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        handleTitleChange={handleTitleChange}
        newAuthor={newAuthor}
        handleAuthorChange={handleAuthorChange}
        newUrl={newUrl}
        handleUrlChange={handleUrlChange}
      />
    </Togglable>
  )

  const addLike = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      const updatedBlog = {
        ...blogObject,
        id,
      }
      setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
    } catch (err) {
      console.error(err)
      setTimeout(() => {
      }, 5000)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const blog = blogs.filter((blog) => blog.id === id)
      if (window.confirm(`Remove ${blog[0].title} by ${blog[0].author}`)) {
        await blogService.deleteBlog(id)
        setBlogs(blogs.filter((blog) => blog.id !== id))
      }
    } catch (err) {
      console.error(err)
      setTimeout(() => {
      }, 5000)
    }
  }

  return (
    <div>
      {user === null?
        loginForm():
        <div>
          <h2>blogs</h2>
          <span>{user.username} logged in</span> <button onClick={handleLogout}>log out</button>
          {blogForm()}
          {blogs.sort((a, b) => b.likes - a.likes).map(blog => <Blog key={blog.id} blog={blog} updateLike={addLike} deleteBlog={deleteBlog}/>)}
        </div>
      }
    </div>
  )
}


export default App


