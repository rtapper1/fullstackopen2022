import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInUser, signOutUser } from '../reducers/userReducer'

const Form = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      username{' '}
      <input
        id="username"
        type="username"
        value={props.username}
        onChange={({ target }) => props.onUsernameChange(target.value)}
      />
    </div>
    <div>
      password{' '}
      <input
        id="password"
        type="password"
        value={props.password}
        onChange={({ target }) => props.onPasswordChange(target.value)}
      />
    </div>
    <div>
      <input id="login-button" type="submit" />
    </div>
  </form>
)

const UserText = (props) => (
  <div>
    {props.name} logged in{' '}
    <button id="logout-button" onClick={props.handleClick}>
      logout
    </button>
  </div>
)

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector((state) => state.user)

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(signInUser(username, password))
    setUsername('')
    setPassword('')
  }

  const handleLogout = () => {
    dispatch(signOutUser())
  }

  return (
    <div>
      {!user &&
        Form({
          handleSubmit,
          username,
          onUsernameChange: setUsername,
          password,
          onPasswordChange: setPassword,
        })}
      {user && UserText({ name: user.name, handleClick: handleLogout })}
    </div>
  )
}

export default Login
