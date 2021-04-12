import React, { useState } from 'react'


const Blog = ({ blog, increaseLikes, handleRemove, user }) => {
  const [ visible, setVisible ] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  // const handleLike = (event) => {
  //   increaseLikes(event.target.value)
  // }

  return (
    <div className='blog__container'>

      <div className='blog__item' style={hideWhenVisible}> {/* when true, hide */}
        <div className='titleauthor blog__item__content'>
          {blog.title} {blog.author}
        </div>
        <button className='blog__item__button' onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}> {/* when true, show */}
        <div className='likesurl blog__item'>
          <span>{blog.title} {blog.author}</span>
          <button className='blog__item__button' onClick={toggleVisibility}>hide</button>
          <div>{blog.url}</div>
          <div>likes {blog.likes}
            <button value={blog.id} onClick={increaseLikes}>like</button>
          </div>
          <div>added by {blog.author} </div>
          <button value={blog.id} onClick={() => handleRemove(blog.id)}>remove</button>
        </div>
      </div>

    </div>
  )
}

export default Blog
