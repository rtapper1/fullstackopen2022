import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification.msg) {
    return <></>
  }
  const className =
    notification.type === 'error' ? 'error notification' : 'ok notification'
  return <div className={className}>{notification.msg}</div>
}

export default Notification
