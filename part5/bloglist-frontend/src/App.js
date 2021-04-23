import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
      .then(initialblogs =>{
      setBlogs( initialblogs )
    })
  }, [])
    //)
    //(async function getAll() {
    //  const blogs = await blogService.getAll()
    //  setBlogs(blogs)
    //})()  
  
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("Hello")
      console.log(user)
      console.log("Hi")
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event)=>{
    event.preventDefault()
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
  
  const handleLogin =  (event) =>{
    event.preventDefault()
    try {
      const user =  loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const loginForm = ()=>(
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const blogForm = ()=>(
    <div>
    <form onSubmit={addBlog}>
      <h2>create new</h2>
        <div>title:<input value={newTitle} onChange={handleTitleChange}/></div>
        <div>author:<input  value={newAuthor} onChange={handleAuthorChange}/></div>
        <div>url:<input  value={newUrl} onChange={handleUrlChange}/></div>
      <button type="submit">create</button>
    </form> 
    </div>
  )
  
  const showUsername=()=>(
    console.log(user)
  ) 

  return (
    <div>
    
    {user === null? 
      loginForm():
    <div>
      <h2>blogs</h2>
      {showUsername()}
      <span>{user.username} logged in</span> <button onClick={handleLogout}>log out</button>
      {blogForm()}
      {blogs.map(blog =><Blog key={blog.id} blog={blog} />)}
    </div>
    }

    </div>
  )
}


export default App


