const Notification = (props) => {
  if (!props.notification) {
    return (<></>)
  }
  const className = props.notification.error ? 'error notification' : 'ok notification'
  return (
    <div className={className}>{props.notification.message}</div>
  )
}

export default Notification