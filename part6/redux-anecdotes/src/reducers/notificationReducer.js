import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotificationText(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationText, clearNotification } = notificationSlice.actions

export const setNotification = (message, durationSeconds = 5) => {
  return async (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotificationText(message))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
      timeoutId = null
    }, durationSeconds * 1000)
  }
}

export default notificationSlice.reducer
