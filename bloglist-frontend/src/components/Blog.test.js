import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import axiosMock from 'axios'

describe('Blog', () => {
  let component
  let mockHandler
  let blog

  beforeEach(() => {
    blog = {
      title: 'react-testing-library',
      author: 'lola',
      url: 'google.com',
      likes: 5
    }
    
    mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} onClick={mockHandler}/>
    )
    
  })
  // component.debug()
  
  test('renders title', () => {
    const div = component.container.querySelector('.titleauthor')
    expect(div).toHaveTextContent('react-testing-library')
  })
  
  test('renders author', () => {
    const div = component.container.querySelector('.titleauthor')
    expect(div).toHaveTextContent('lola')
    // expect(div).not.toHaveStyle('display: none') // at start this block is visible
  })

  test('button click shows url and number of likes', () => {
    const button = component.getByText('view')
    fireEvent.click(button) // Clicking happens with the fireEvent method.
    const div = component.container.querySelector('.likesurl')
    // expect(div).toHaveTextContent('google.comlikes 5likeadded')
    expect(div).not.toHaveStyle('display: none')
  })

  function tick() {
    return new Promise(resolve => {
        setTimeout(resolve, 5)
    })
  }

  test('like button clicked twice', async () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.likesurl')
    expect(div).toHaveTextContent('like')
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    await tick()

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  

})