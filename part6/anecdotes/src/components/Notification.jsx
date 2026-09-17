import { useNotification } from '../store'

const Notification = () => {
  const message = useNotification()

  if (!message) return null

  return <div role="status" className="notification">{message}</div>
}

export default Notification