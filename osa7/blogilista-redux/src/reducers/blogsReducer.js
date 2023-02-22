import { createSlice } from '@reduxjs/toolkit'

import blogService from '../services/blogs'
import { notify } from './notificationReducer'
import { initUsers } from './usersReducer'

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
    addComment: (state, action) => {
      const blog = state.find((s) => s.id === action.payload.blog.id)
      const commentedBlog = {
        ...blog,
        comments: blog.comments.concat(action.payload.comment),
      }
      return state.map((s) =>
        s.id !== action.payload.blog.id ? s : commentedBlog
      )
    },
  },
})

export const { setBlogs, addBlog, deleteBlog, addLike, addComment } =
  blogSlice.actions

export const initBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((res) => dispatch(setBlogs(res)))
  }
}

export const createBlog = (title, author, url) => {
  return (dispatch) => {
    let properUrl
    if (!/^http/.test(url)) {
      properUrl = `https://${url}`
    } else {
      properUrl = url
    }
    blogService
      .createBlog(asObject(title, author, properUrl))
      .then((res) => {
        dispatch(addBlog(res))
        dispatch(
          notify(`A new blog ${res.title} by ${res.author} added`, 'info')
        )
        dispatch(initBlogs())
        dispatch(initUsers())
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
        dispatch(initUsers())
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
        dispatch(initUsers())
      })
      .catch((err) => {
        console.log(`Something went wrong with like: ${err}`)
      })
  }
}

export const commentBlog = (blog, comment) => {
  return (dispatch) => {
    blogService.commentBlog(blog, comment).then(() => {
      dispatch(addComment({ blog, comment }))
    })
  }
}

export default blogSlice.reducer
