import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const asObject = (title, author, url) => ({
  title,
  author,
  url,
})

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    addBlog: (state, action) => {
      return state.concat(action.payload)
    },
    deleteBlog: (state, action) => {
      return state.filter((s) => s.id !== action.payload.id)
    },
    addLike: (state, action) => {
      const likedBlog = state.find((s) => s.id === action.payload.id)
      const modifiedBlog = { ...likedBlog, likes: likedBlog.likes + 1 }
      return state.map((s) => (s.id !== action.payload.id ? s : modifiedBlog))
    },
  },
})

export const { setBlogs, addBlog, deleteBlog, addLike } = blogSlice.actions

export const initBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((res) => dispatch(setBlogs(res)))
  }
}

export const createBlog = (title, author, url) => {
  return (dispatch) => {
    blogService
      .createBlog(asObject(title, author, url))
      .then((res) => {
        dispatch(addBlog(res))
        dispatch(
          notify(`A new blog ${res.title} by ${res.author} added`, 'info')
        )
        dispatch(initBlogs())
      })
      .catch((err) => {
        console.log('Creating new blog failed:', err)
        dispatch(
          notify('Adding a new blog failed. Are you logged in?', 'error')
        )
      })
  }
}

export const removeBlog = (blog) => {
  return (dispatch) => {
    blogService
      .deleteBlog(blog)
      .then(() => {
        dispatch(deleteBlog(blog))
        dispatch(initBlogs())
      })
      .catch((err) => {
        console.log('Something went wrong while deleting', err)
        dispatch(
          notify(
            `Something went wrong while deleting ${blog.title} by ${blog.author}. Is this your blog to delete?`,
            'error'
          )
        )
      })
  }
}

export const likeBlog = (blog) => {
  return (dispatch) => {
    blogService
      .likeBlog(blog)
      .then(() => {
        dispatch(addLike(blog))
        dispatch(initBlogs())
      })
      .catch((err) => {
        console.log(`Something went wrong with like: ${err}`)
      })
  }
}

export default blogSlice.reducer
