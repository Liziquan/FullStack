import React from 'react'
import { useSelector } from 'react-redux'
import {  Redirect, useRouteMatch } from 'react-router-dom'

const User = () => {
  const userId = useRouteMatch('/users/:id').params.id
  const userToShow = useSelector((state) => state.users.find((user) => user.id === userId))

  if (!userToShow) {
    return <Redirect to="/users" />
  }

  return (
      <div>
        <div>
          {userToShow.name}
        </div>
        <div>Added blogs:</div>
        <ul>
          {userToShow.blogs.map((blog) => (
            <li key={blog.id}>
                {blog.title}
            </li>
          ))}
        </ul>
      </div>
  )
}

export default User