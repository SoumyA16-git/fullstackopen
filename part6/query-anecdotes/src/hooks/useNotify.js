import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

export const useNotify = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotify must be used within NotificationContextProvider')
  }
  return context.notify
}

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotificationValue must be used within NotificationContextProvider')
  }
  return context.notification
}

export default useNotify
