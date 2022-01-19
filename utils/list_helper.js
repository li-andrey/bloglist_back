const _ = require('lodash');
const Blog = require('../models/blog')
const User = require('../models/user')

const palindrome = (string) => {
  return string
    .split("")
    .reverse("")
    .join("")
}

const average = (array) => {
  return array.length === 0
    ? 0
    : array.reduce((sum, item) => sum + item, 0) / array.length
}

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sumOfLikes, onePostLikes) => sumOfLikes + onePostLikes.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const index = likes.indexOf(Math.max(...likes))
  return blogs[index]
}

const mostBlogs = (blogs) => {
  let name = 'Nobody';
  let writtenBlogs = 0;

  if (blogs.length === 0) {
    return { name, blogs: writtenBlogs };
  }

  const groupedByAuthor = _.groupBy(blogs, 'author');
  return _.reduce(
    groupedByAuthor,
    (carry, blogList, author) => {
      if (blogList.length > carry.blogs) {
        return {
          name: author,
          blogs: blogList.length
        }
      }
      return carry;
    },
    { name, blogs: writtenBlogs }
  )
}

const mostLikes = blogs => {
  let author = 'Nobody';
  let likes = 0;

  if (blogs.length === 0) {
    return { author, likes };
  }

  const groupedByAuthor = _.groupBy(blogs, 'author');

  return _.reduce(
    groupedByAuthor,
    (carry, blogList, blogAuthor) => {
      const blogLikes = _.sumBy(blogList, 'likes');

      if (blogLikes > carry.likes) {
        return {
          author: blogAuthor,
          likes: blogLikes
        };
      }
      return carry;
    },
    { author, likes }
  );
};

const initialBlogs = [
  { _id: "5a422a851b54a676234d17f7", title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
  { _id: "5a422aa71b54a676234d17f8", title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5, __v: 0 },
  // { _id: "5a422b3a1b54a676234d17f9", title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12, __v: 0 },
  // { _id: "5a422b891b54a676234d17fa", title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10, __v: 0 },
  // { _id: "5a422ba71b54a676234d17fb", title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0, __v: 0 },
  // { _id: "5a422bc61b54a676234d17fc", title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2, __v: 0 }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}


module.exports = {
  palindrome, average, dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes, initialBlogs, nonExistingId, blogsInDb, usersInDb
}