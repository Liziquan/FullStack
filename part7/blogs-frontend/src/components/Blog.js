import React,{useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useRouteMatch } from 'react-router-dom'
import { likeBlog, addComment } from '../reducers/blogReducer'

const CommentForm = ({ handleAddComment }) => {
  const [comment, setComment] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    const title=comment
    handleAddComment({title,})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='comment'
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">
        Add Comment
      </button>
    </form>
  )
}

const Comments = ({ blog, handleAddComment }) => (
  <div>
    <h3>Comments:</h3>
    <CommentForm handleAddComment={handleAddComment} />
    <ul>

      {blog.comments &&
        blog.comments.map((comment) => <li key={comment.id}>{comment.title}</li>)}

    </ul>
  </div>
)

const Blog = () => {
  const blogId = useRouteMatch('/blogs/:id').params.id
  const blog = useSelector((state) => state.blogs.find((b) => b.id === blogId))
  const dispatch = useDispatch()
  const handleAddLike = () => {
    dispatch(likeBlog(blogId,{ ...blog, likes: blog.likes + 1 }))
  }

  const handleAddComment = (comment) => {
     dispatch(addComment(blogId,comment))
   }

  if (!blog) {
    return <Redirect to="/" />
  }

  return (
      <div>
        <h2>
          {blog.title}  {blog.author}
        </h2>
        <a href={blog.url} target="_blank" rel="noopener noreferrer">
          {blog.url}
        </a>
        <p className="likes">
          {blog.likes} likes
          <button onClick={handleAddLike}>
            like
          </button>
        </p>
        <p>
          Added by {blog.user.name}
        </p>
        {<Comments blog={blog} handleAddComment={handleAddComment} />}
      </div>
  )
}

export default Blog