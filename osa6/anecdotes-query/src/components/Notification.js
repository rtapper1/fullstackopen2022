import { useContext } from "react"
import NotifContext from "../NotifContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const [notif, dispatch] = useContext(NotifContext)
  
  
  if (notif) {
    setTimeout(() => {
      dispatch({type: 'RESET'})
    }, 5000)
    return (
      <div style={style}>
        {notif}
      </div>
    )
  }
}

export default Notification
