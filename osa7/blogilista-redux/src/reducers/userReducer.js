import { createSlice } from '@reduxjs/toolkit'

import login from '../services/login'
import blogService from '../services/blogs'
import { notify } from './notificationReducer'
import { initBlogs } from './blogsReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const signInUser = (username, password) => {
  return (dispatch) => {
    login(username, password)
      .then((res) => {
        dispatch(setUser(res))
        window.localStorage.setItem('user', JSON.stringify(res))
        dispatch(notify(`User ${res.name} signed in successfully!`, 'info'))
      })
      .catch((err) => {
        console.log('Login failed!', err)
        dispatch(notify('Wrong username or password!', 'error'))
      })
  }
}

export const signOutUser = () => {
  return (dispatch) => {
    dispatch(setUser(null))
    window.localStorage.clear()
    blogService.setToken(undefined)
    dispatch(initBlogs())
  }
}

export const initUser = () => {
  return (dispatch) => {
    const user = JSON.parse(window.localStorage.getItem('user'))
    if (user) {
      dispatch(setUser(JSON.parse(window.localStorage.getItem('user'))))
      blogService.setToken(
        JSON.parse(window.localStorage.getItem('user')).token
      )
    }
    dispatch(initBlogs())
  }
}

export default userSlice.reducer
