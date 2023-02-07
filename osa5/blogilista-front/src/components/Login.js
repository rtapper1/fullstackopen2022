import { useState, useEffect } from "react"
import login from '../services/login'
import blogService from '../services/blogs'

const Form = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      username <input type='username' value={props.username} onChange={({target}) => props.onUsernameChange(target.value)} />
    </div>
    <div>
      password <input type='password' value={props.password} onChange={({target}) => props.onPasswordChange(target.value)} />
    </div>
    <div>
      <input type='submit' />
    </div>
  </form>
)

const UserText = (props) => (
  <div>{props.name} logged in <button onClick={props.handleClick}>logout</button></div>
)

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    login(username, password)
      .then(res => {
        setUser(res)
        window.localStorage.setItem('user', JSON.stringify(res))
        props.setNotification({
          error: false,
          message: `User ${res.name} signed in successfully!`
        })
      })
      .catch(err => {
        console.log('Login failed!', err)
        props.setNotification({
          error: true,
          message: `Wrong username or password!`
        })
      })
      .finally(() => {
        setUsername('')
        setPassword('')
      })
  }
  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(undefined)
    blogService.setToken(undefined)
  }

  return (
    <div>
      {!user && Form({handleSubmit, 
        username, 
        onUsernameChange: setUsername,
        password,
        onPasswordChange: setPassword})}
      {user && UserText({name: user.name, handleClick: handleLogout})}
    </div>
  )
}

export default Login