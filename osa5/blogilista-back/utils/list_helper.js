const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((count, blog) => count + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return _.maxBy(blogs, (blog) => blog.likes) 
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  
  const authorBlogs = _.countBy(blogs, (blog) => blog.author)
  const mostBlogsAuthor = _.maxBy(Object.entries(authorBlogs), (author) => author[1])
  return  {author: mostBlogsAuthor[0], blogs: mostBlogsAuthor[1]}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return undefined
  }
  
  const authorLikes = _(blogs)
    .groupBy('author')
    .map((author, authorName) => ({
      author: authorName,
      likes: _.sumBy(author, 'likes')
    }))
    .value()
  
  return _.maxBy(authorLikes, (author) => author.likes)
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}