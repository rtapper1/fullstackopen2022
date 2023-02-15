import { createContext, useReducer } from "react"

const notifReducer = (state, action) => {
  switch (action.type){
    case 'SET_MSG':
      return action.payload
    case 'RESET':
      return ''
    default:
      return state
  }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notifReducer, 0)

  return (
    <NotifContext.Provider value={[notif, notifDispatch]}>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext