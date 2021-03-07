import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {

  const [ newBlogTitle, setNewBlogTitle ] = useState('')
  const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  const [ newBlogUrl, setNewBlogUrl ] = useState('')

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }
    // console.log(blogObject)
    createBlog(blogObject)

    setNewBlogTitle('')
    setNewBlogAuthor('') 
    setNewBlogUrl('') 
  } 

  return (
    <section>
      <form onSubmit={addBlog}>
        <h3>create new</h3>
        <div className='blogform__input'><span>title:</span><input value={newBlogTitle} onChange={handleBlogTitleChange}/></div>
        <div className='blogform__input'><span>author:</span><input value={newBlogAuthor} onChange={handleBlogAuthorChange}/></div>
        <div className='blogform__input'><span>url:</span><input value={newBlogUrl} onChange={handleBlogUrlChange}/></div>
        <button type="submit">save</button>
      </form>  
    </section>
  )

}

export default BlogForm