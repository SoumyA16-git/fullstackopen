import { createContext, useState, useRef } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')
  const timerRef = useRef(null)

  const notify = (message, durationSeconds = 5) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    setNotification(message)
    timerRef.current = setTimeout(() => {
      setNotification('')
      timerRef.current = null
    }, durationSeconds * 1000)
  }

  return (
    <NotificationContext.Provider value={{ notification, notify }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
