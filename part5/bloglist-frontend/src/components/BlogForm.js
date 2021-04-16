import React,{ useState } from 'react'


const BlogForm = ({handleBlogCreate})=>{
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    return (
        <div>
            <h2>create new</h2>
            title:<input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)}/>
            author:<input type="text" value={author} name="Author" onChange={({ target }) => setAuthor(target.value)}/>
            url:<input type="text" value={url} name="Url" onChange={({ target }) => setUrl(target.value)}/>
            <button onClick={handleBlogCreate}>create</button>
        </div>
    )
}
export default BlogForm