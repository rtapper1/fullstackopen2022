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

describe('user initialisation gone correct', () => {
  test('correct number of entries', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    expect(users.body).toHaveLength(2)
  })

  test('contains both users', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usernames = users.body.map(user => user.username)

    expect(usernames).toContain('user1')
    expect(usernames).toContain('user2')
  })
})

describe('try to create invalid users', () => {
  test('username missing', async () => {
    await api.post('/api/users')
      .send({
        name: 'Test user',
        password: 'supermegasecret'
      })
      .expect(400)
  })

  test('username too short', async () => {
    await api.post('/api/users')
      .send({
        username: 'un',
        name: 'Test user',
        password: 'supermegasecret'
      })
      .expect(400)
  })

  test('password missing', async () => {
    await api.post('/api/users')
      .send({
        username: 'username3',
        name: 'Test user'
      })
      .expect(400)
  })

  test('password too short', async () => {
    await api.post('/api/users')
      .send({
        username: 'username3',
        name: 'Test user',
        password: 'pw'
      })
      .expect(400)
  })

  test('add user with existing username', async () => {
    await api.post('/api/users')
      .send({
        username: 'user1',
        name: 'Test user',
        password: 'pwd1234'
      })
      .expect(400)
  })
})