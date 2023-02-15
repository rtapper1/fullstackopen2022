import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return ''
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (message, secs) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => dispatch(removeNotification()), secs*1000)
  }
}

export default notificationSlice.reducer