const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  if (password === undefined) {
    return res.status(400).json({error: 'password missing'})
  }
  if (password.length <= 3) {
    return res.status(400).json({error: 'password too short'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const blogs = []
  const user = new User({
    username,
    name,
    passwordHash,
    blogs
  })
  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', {url: 1, title: 1, author: 1})

  res.status(200).json(users)
})

module.exports = usersRouter
