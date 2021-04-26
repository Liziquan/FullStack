import React,{ useState } from 'react'
const Blog = ({ blog,updateLike, deleteBlog }) => {
  const [showDetail,setShowDetail] = useState(false)
  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }
  const update = () => {
    const { id, author, url, title } = blog
    const updatedBlog = {
      likes: blog.likes + 1,
      title,
      author,
      url,
    }
    updateLike(id, updatedBlog)
  }
  const removeBlog = () => {
    deleteBlog(blog.id)
  }
  return (
    <div data-cy="blog">
      {blog.title} {blog.author} <button onClick={toggleShowDetail} style={{ display:showDetail?'none':'inline' }}> View </button><button onClick={toggleShowDetail} style={{ display:showDetail?'inline':'none' }}> Hide </button>
      <div data-testid="hidden-content" style={{ display:showDetail?'inline':'none' }}>
        <div>{blog.url}</div>
        Likes<span data-cy="likes" id="like-number"> {blog.likes} </span><button id="likebutton" onClick={update}>like</button>
        <div>{blog.user?.name}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog

