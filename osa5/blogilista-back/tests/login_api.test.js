const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const initialUsers = [
  {
    username: 'user1',
    name: 'first last',
    password: 'verysecret'
  },
  {
    username: 'user2',
    name: 'name other',
    password: 'topsecret'
  }
]

beforeEach(async () => {
  await User.deleteMany({})
  const promises = initialUsers.map(user => api.post('/api/users').send(user))
  await Promise.all(promises)
})

describe('test login works properly', () => {
  test('correct username and password', async () => {
    const token = await api.post('/api/login')
      .send({
        username: 'user1',
        password: 'verysecret'
      })
      .expect(200)
    
    expect(token.body.token).toBeDefined()
    expect(token.body.username).toBe('user1')
    expect(token.body.name).toBe('first last')
  })

  test('incorrect password', async () => {
    const token = await api.post('/api/login')
      .send({
        username: 'user1',
        password: 'verysecret1'
      })
      .expect(401)
  })

  test('incorrect username', async () => {
    const token = await api.post('/api/login')
      .send({
        username: 'user3',
        password: 'verysecret'
      })
      .expect(401)
  })
})