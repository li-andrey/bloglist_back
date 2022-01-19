const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, id: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(body)
  if (body.password < 3) {
    response.status(400).json({ error: "Password should be more than 3 letters" })
  } else {
    const saltRounds = 5
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    try {
      const savedUser = await user.save()
      response.json(savedUser)
    } catch (error) {
      response.status(400).json({ error: error })
    }
  }
})

module.exports = usersRouter