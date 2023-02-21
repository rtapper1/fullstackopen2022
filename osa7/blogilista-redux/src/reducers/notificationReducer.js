import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  msg: '',
  type: '',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.msg = action.payload.msg
      state.type = action.payload.type
      return state
    },
    resetNotification: () => {
      return initialState
    },
  },
})

export const { setNotification, resetNotification } = notificationSlice.actions

export const notify = (msg, type) => {
  return (dispatch) => {
    dispatch(
      setNotification({
        msg,
        type,
      })
    )
    setTimeout(() => dispatch(resetNotification()), 5000)
  }
}

export default notificationSlice.reducer
