import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { prettyDOM, fireEvent } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
  }  
  const blog = {
    author: 'Just me',
    title: 'Blog title',
    url: 'http://blog-title.com',
    likes: 0,
  }
  const mockHandlerUpdate = jest.fn()
  const mockHandlerRemove = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        user={user}
        removeBlog={mockHandlerRemove}
        updateLike={mockHandlerUpdate}
        blog={blog}
      />
    )
  })

  test('render title and author, but do not render url and likes ', () => {
    expect(component.container).toHaveTextContent(blog.title)
    expect(component.container).toHaveTextContent(blog.author)
    const defaultHiddenContent = component.getByTestId('hidden-content')
    expect(defaultHiddenContent).toHaveStyle('display: none')
  })

  test('render blog url and likes when view button is clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)  
    expect(component.container).toHaveTextContent(blog.url)
    expect(component.container).toHaveTextContent(blog.likes)
  })

  test('click the like button twice and then event handler passed as a prop twice', () => {
    const button = component.getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandlerUpdate.mock.calls).toHaveLength(2)
  })

})











