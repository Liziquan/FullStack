import React from 'react'


const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange
}) => (
  <div>
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>title:<input id="title" value={newTitle} onChange={handleTitleChange}/></div>
      <div>author:<input id="author" value={newAuthor} onChange={handleAuthorChange}/></div>
      <div>url:<input id="url" value={newUrl} onChange={handleUrlChange}/></div>
      <button id="create" type="submit">create</button>
    </form>
  </div>
)
export default BlogForm