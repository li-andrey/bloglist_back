const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const list_helper = require('../utils/list_helper')

const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(list_helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(list_helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(list_helper.initialBlogs.length)
})

test('correct amount of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(list_helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)
  expect(titles).toContain("React patterns")
})

test('Database names the property _id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Test blog could be added",
    author: "Test author",
    url: "Test url",
    likes: 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await list_helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(list_helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'Test blog could be added'
  )
})

test('blog without title is not added', async () => {
  const newBlog = {
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogsAtEnd = await list_helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(list_helper.initialBlogs.length)
})

test("Missing property likes return 0", async () => {
  const newBlog = {
    title: "Test blog could be added",
    author: "Test author",
    url: "Test url"
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)

  const blog = (await Blog.findById(result.body.id)).toJSON()
  expect(blog.likes).toBe(0)
})

test("Title and url properties are missing from the request data", async () => {
  const newBlog = {
    author: "Test author",
    likes: 3
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)
  expect(result.status).toBe(400)
})

test("Deleting is successful", async () => {
  const newBlog = {
    title: "Test blog could be added",
    author: "Test author",
    url: "Test url"
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)

  const deleteBlog = await api
    .delete(`/api/blogs/${result.body.id}`)

  expect(deleteBlog.status).toBe(204)
})

test("Update is successful", async () => {
  const newBlog = {
    title: "Test blog could be added",
    author: "Test author",
    url: "Test url",
    likes: 3
  }
  const result = await api
    .post('/api/blogs')
    .send(newBlog)

  newBlog.likes += 1

  await api
    .put(`/api/blogs/${result.body.id}`)
    .send(newBlog)

  const newResult = await api.get(`/api/blogs/${result.body.id}`)
  expect(newResult.body.likes).toBe(newBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})