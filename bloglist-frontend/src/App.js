import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [ blogs, setBlogs ] = useState([])
  // const [ newBlogTitle, setNewBlogTitle ] = useState('')
  // const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  // const [ newBlogUrl, setNewBlogUrl ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState()
  const [ message, setMessage ] = useState()
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ user, setUser ] = useState(null)


  useEffect(() => {
    (async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    })()
  }, [])

  // save log in info
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange = ({ target }) => setPassword(target.value)

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      // save login info
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      // console.log(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const increaseLikes = async (event) => {
    let id = event.target.value
    let blog = blogs.find(blog => blog.id === id)
    let blogObject = { ...blog, likes: blog.likes + 1 }
    // console.log(blogObject)
    const returnedBlog = await blogService.update(blogObject)
    // console.log('BLOG', blogObject, returnedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : { ...returnedBlog, user: blogObject.user }))

  }

  const removeBlog = async (id) => {
    let blogToRemove = blogs.find(blog => blog.id === id)
    // blogService.setToken(user.token)

    if (!window.confirm('Delete person')) return
    await blogService.del(blogToRemove.id)

    setMessage(`Removed ${blogToRemove.title} successfully`)
    setTimeout(() => setMessage(null), 5000)

    setBlogs(blogs.filter(blog => blog.id !== id))
  }


  const addBlog = async (blogObject) => {
    const returnedBlog = await blogService.create(blogObject)

    console.log('RETURNED', returnedBlog)
    setBlogs(blogs.concat({ ...returnedBlog, user: user }))

    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)

  }

  const userInfo = () => (
    <p><strong>{`${user.name}`}</strong> logged in
      <button onClick={handleLogout}>log out</button>
    </p>
  )

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>

  )

  const loginForm = () => {
    return (

      <Togglable buttonLabel='login'>
        <LoginForm
          handleSubmit={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </Togglable>
    )
  }

  return (
    <div className='container'>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      { user === null ? loginForm() :
        <div>{userInfo()} {blogForm()}</div> }

      <section className='blog__section'>
        { blogs.sort((a, b) =>  b.likes - a.likes).map((blog, index) =>
          <Blog key={index} blog={blog} increaseLikes={ increaseLikes } handleRemove={ removeBlog } user = { user } />
        )}
      </section>
    </div>
  )
}

export default App