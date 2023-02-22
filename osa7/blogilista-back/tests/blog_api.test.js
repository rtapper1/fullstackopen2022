const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

const initialBlogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }  
]

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
  await Blog.deleteMany({})
  await User.deleteMany({})
  const promises = initialUsers.map(user => api.post('/api/users').send(user))
  await Promise.all(promises)
  const token1 = await api.post('/api/login')
    .send({
      username: 'user1',
      password: 'verysecret'
    })
  const token2 = await api.post('/api/login')
    .send({
      username: 'user2',
      password: 'topsecret'
    })
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token1.body.token}`)
    .send(initialBlogs[0])  
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token1.body.token}`)
    .send(initialBlogs[1])
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token1.body.token}`)
    .send(initialBlogs[2])
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token2.body.token}`)
    .send(initialBlogs[3])
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token2.body.token}`)
    .send(initialBlogs[4])
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token2.body.token}`)
    .send(initialBlogs[5])
})

test('initial blogs are correct', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  expect(res.body).toHaveLength(6)
})

test('blog has ID called id, not _id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
  expect(res.body[0]._id).toBe(undefined)
})

test('a blog is added with POST', async () => {
  const token = await api.post('/api/login')
    .send({
      username: 'user2',
      password: 'topsecret'
    })
  const newPost = {
    title: "Richies blog",
    author: "Richie the Rich",
    url: "http://richiesblog.com",
    likes: 1
  }
  const startingPoint = await api.get('/api/blogs')
  await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token.body.token}`)
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(startingPoint.body.length + 1)
  const contents = res.body.map(blog => ({
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
    url: blog.url
  }))
  expect(contents).toContainEqual(newPost)
})

test('an undefined like is zero likes', async () => {
  const token = await api.post('/api/login')
    .send({
      username: 'user2',
      password: 'topsecret'
    })
  const newPost = {
    title: "Richies blog",
    author: "Richie the Rich",
    url: "http://richiesblog.com"
  }
  const addedBlog = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${token.body.token}`)
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  expect(addedBlog.body.likes).toBe(0)
})

test('enforce schema', async () => {
  const token = await api.post('/api/login')
    .send({
      username: 'user2',
      password: 'topsecret'
    })
  const newPost1 = {
    author: "Richie the Rich",
    url: "http://richiesblog.com",
    likes: 0
  }
  await api.post('/api/blogs').send(newPost1)
    .set('Authorization', `Bearer ${token.body.token}`)
    .expect(400)

  const newPost2 = {
    title: "Richies blog",
    author: "Richie the Rich",
    likes: 0
  }
  await api.post('/api/blogs').send(newPost2)
    .set('Authorization', `Bearer ${token.body.token}`)
    .expect(400)
})

test('delete works', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const token = await api.post('/api/login')
    .send({
      username: 'user2',
      password: 'topsecret'
    })
  const blogToDelete = initialBlogs.body.find(blog => blog.user.username === 'user2')
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token.body.token}`)
    .expect(204)
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(initialBlogs.body.length - 1)
  expect(blogs.body).not.toContainEqual(blogToDelete)
})

test('does the update work', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const updatedBlog = {...initialBlogs.body[0], likes: 19}
  await api.put(`/api/blogs/${updatedBlog.id}`).send({...updatedBlog, user: updatedBlog.user.id})
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const blogs = await api.get('/api/blogs')

  expect(blogs.body).toHaveLength(initialBlogs.body.length)
  expect(blogs.body).toContainEqual(updatedBlog)
})

test('a blog is added without a token', async () => {
  const newPost = {
    title: "Richies blog",
    author: "Richie the Rich",
    url: "http://richiesblog.com",
    likes: 1
  }
  await api.post('/api/blogs')
    .send(newPost)
    .expect(401)
})

test('a blog is added with a bogus token', async () => {
  const newPost = {
    title: "Richies blog",
    author: "Richie the Rich",
    url: "http://richiesblog.com",
    likes: 1
  }
  await api.post('/api/blogs')
    .set('Authorization', 'Bearer fasidfjaosdfijaoisdjf')
    .send(newPost)
    .expect(401)
})

test('delete by wrong user', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const token = await api.post('/api/login')
    .send({
      username: 'user1',
      password: 'verysecret'
    })
  const blogToDelete = initialBlogs.body.find(blog => blog.user.username === 'user2')
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token.body.token}`)
    .expect(403)
})

test('delete by wrong user', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const token = await api.post('/api/login')
    .send({
      username: 'user1',
      password: 'verysecret'
    })
  const blogToDelete = initialBlogs.body.find(blog => blog.user.username === 'user2')
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token.body.token}`)
    .expect(403)
})

test('delete without a token', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const blogToDelete = initialBlogs.body.find(blog => blog.user.username === 'user2')
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)
})

test('delete with a bogus token', async () => {
  const initialBlogs = await api.get('/api/blogs')
  const blogToDelete = initialBlogs.body.find(blog => blog.user.username === 'user2')
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer asldfijalskfhasiufhawkeiufha`)
    .expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})