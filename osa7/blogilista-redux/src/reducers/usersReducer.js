import { createSlice } from '@reduxjs/toolkit'

import usersService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: null,
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    },
  },
})

export const { setUsers } = usersSlice.actions

export const initUsers = () => {
  return (dispatch) => {
    usersService.getAll().then((res) => dispatch(setUsers(res)))
  }
}

export default usersSlice.reducer
