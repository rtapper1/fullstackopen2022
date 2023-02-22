const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blogToSave =
    request.body.likes === undefined
      ? { ...request.body, likes: 0 }
      : request.body
  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token' })
  }

  const blog = new Blog({ ...blogToSave, user: decodedToken.id })
  const savedBlog = await blog.save()

  const user = await User.findById(decodedToken.id)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  const blogToDelete = await Blog.findById(id)
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if (decodedToken.id.toString() === blogToDelete.user.toString()) {
    await Blog.findByIdAndDelete(id)
    const user = await User.findById(blogToDelete.user.toString())
    user.blogs = user.blogs.filter((blog) => blog.toString() !== id)
    await user.save()
    return response.status(204).end()
  } else {
    return response
      .status(403)
      .json({ error: 'Not authorized to delete this blog.' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const blogToChange = await Blog.findByIdAndUpdate(id, request.body)
  response.status(200).json(blogToChange)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const id = request.params.id
  const blogToChange = await Blog.findById(id)
  const comments = (blogToChange.comments || []).concat(request.body.comment)
  blogToChange.comments = comments
  await blogToChange.save()
  response.status(201).json(blogToChange)
})

module.exports = blogsRouter
