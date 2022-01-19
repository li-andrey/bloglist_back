const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1, username: 1, _id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  if (!request.token && !request.decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(request.decodedToken.id)
  const blog = new Blog({ ...request.body, user: user._id })

  if (typeof blog.title === "undefined" || blog.title === null || typeof blog.url === "undefined" || blog.url === null) {
    response.status(400).end()
  }
  else {
    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.json(savedBlog)
    }
    catch (error) {
      response.status(400).json({ error: error })
    }
  }
})


blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const user = await User.findById(blog.user)

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  user.blogs = user.blogs.concat(updatedBlog._id)
  await user.save()
  response.json(updatedBlog)
})


blogsRouter.delete('/:id', async (request, response) => {
  if (!request.token && !request.decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  try {
    const blog = await Blog.findById(request.params.id)
    const userId = request.decodedToken.id
    if (blog.user.toString() === userId.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).json('Only creeator could delete blog', error)
    }
  }
  catch (error) {
    response.status(400).json({ error: error })
  }
})

module.exports = blogsRouter