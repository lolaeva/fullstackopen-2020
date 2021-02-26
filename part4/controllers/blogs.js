const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, _id: 1 })
  response.json(blogs)
})

// ------------------- add blog --------------------
blogRouter.post('/', async (request, response, next) => {
  const body = request.body
  // === token ===
  // const token = getTokenFrom(request)
  let decodedToken = null
  try{
		decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' })
		}
	} catch(error){
		return response.status(401).json({ error: 'token missing or invalid' })
	}

  const user = await User.findById(decodedToken.id)
  // === end token ===
  // const user = await User.findOne(body.username)
  const blog = new Blog( {
    title: body.title,
    url: body.url,
    likes: body.likes,
    author: user.name,
    user: user._id } )

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
  
})

// ------------------- delete blog ------------------
blogRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  console.log(blog.user.toString())
  let decodedToken = null
  try{
		decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!request.token || !decodedToken.id) {
			return response.status(401).json( { error: 'token missing or invalid' } )
		}
	} catch(error){
		return response.status(401).json( { error: 'token missing or invalid' } )
	}

  if(decodedToken.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json( {error: 'unable to delete other user\'s blog'} )
  }

  console.log(decodedToken.id.toString())
  // response.status(204).end()
})

// ---------------- change number of likes ------------------
blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = { likes: body.likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})


module.exports = blogRouter