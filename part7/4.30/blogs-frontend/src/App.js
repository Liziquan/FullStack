import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import blogService from './services/blogs'
import { initializeBlogs, createBlog, likeBlog, removeBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'
import { setNotification, deleteNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.login)
  const notification = useSelector(state => state.notification)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedInUserJSON = JSON.parse(
      window.localStorage.getItem('loggedInBloglistUser'),
    )
    if (loggedInUserJSON) {
      const user = loggedInUserJSON
      blogService.setToken(user.token)
    }
  }, [])


//  useEffect(() => {
//    window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
//    blogService.setToken(user.token)
//  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username, password))
      dispatch(setNotification(`${user.name} welcome back!`))   
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))
    } catch(exception) {
      dispatch(setNotification('wrong username/password'))  
    }
  }

  const handleCreateBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch(createBlog(newBlog, user))
      blogFormRef.current.toggleVisibility()
      dispatch(setNotification(`a new blog '${newBlog.title}' by ${newBlog.author} added!`))
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    dispatch(likeBlog(likedBlog))
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    window.localStorage.clear()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification notification={notification} />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={handleCreateBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App