import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import User from './components/User'


import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state=>state.blogs)
  //const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const notification = useSelector(state=>state.notification)
  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(state=>state.login)



  useEffect(() => {
    if(user){
      window.localStorage.setItem('loggedInBloglistUser', JSON.stringify(user))

    }
  }, [user])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(login(username,password))
      dispatch(setNotification(`${username} welcome back!`,'success'))
    } catch(exception){
      dispatch(setNotification('wrong username/password','error')) 
    }
  }

  const handleCreateBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(blog, user)) 
      dispatch(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      await console.log(exception)
    }
  }



  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(logout())
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
  const padding = {
    padding: 5
  }

  return (
    <div className="container">
      <Router>
      <h2>blogs</h2>
      
      <Notification notification={notification} />
      <p>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={handleCreateBlog} />
      </Togglable>
      
      <ul>
      {blogs.sort(byLikes).map(blog =>
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            <b>{blog.title}</b> {blog.author}
          </Link>
        </li>
      )}
      </ul>
    
      
    
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <p>
            "Hello!!!!!!!!!!!!!"
          </p>
        </Route>
      </Switch>
    </Router>
    </div>
  )
}

export default App