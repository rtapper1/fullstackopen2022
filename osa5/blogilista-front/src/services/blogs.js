import axios from 'axios'
const baseUrl = '/api/blogs'

let token = undefined

const setToken = (newToken) => {
  token = newToken
  return true
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (newBlog) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios
    .post(baseUrl, newBlog, config)
    .then(res => res.data)
}

const likeBlog = (blog) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  const updatedBlog = {
    user: blog.user._id,
    likes: blog.likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
  }
  return axios
    .put(`${baseUrl}/${blog.id}`, updatedBlog, config)
    .then(res => res.data)
}

const deleteBlog = (blog) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  return axios
    .delete(`${baseUrl}/${blog.id}`, config)
    .then(res => res.data)
}

export default { getAll, setToken, createBlog, likeBlog, deleteBlog }