const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const list_helper = require('../utils/list_helper')

const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Test', password: passwordHash })

  await user.save()
})

test('creation fails when username already exists', async () => {
  const usersAtStart = await list_helper.usersInDb()
  const newUser = {
    username: 'root',
    name: 'test',
    password: 'qwerty'
  }

  const result = await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  expect(result.body.error.message).toContain('`username` to be unique')

  const usersAtEnd = await list_helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})


afterAll(() => {
  mongoose.connection.close()
})