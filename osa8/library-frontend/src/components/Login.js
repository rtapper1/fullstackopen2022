import { useMutation, useApolloClient } from '@apollo/client'
import { useEffect } from 'react'

import { LOGIN } from '../queries'

const Login = ({ show, setToken, setPage }) => {
  const [login, result] = useMutation(LOGIN)
  const client = useApolloClient()

  useEffect(() => {
    if (!result.data) {
      return
    }
    const token = result.data.login.value
    setToken(token)
    localStorage.setItem('user-token', token)
    client.resetStore()
  }, [result.data])

  const handleLogin = (event) => {
    event.preventDefault()
    console.log('logging in')

    login({
      variables: {
        username: event.target.username.value,
        password: event.target.password.value,
      },
    })

    event.target.username.value = ''
    event.target.password.value = ''

    setPage('authors')
  }

  if (!show) {
    return null
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="username" name="username" />
      </div>
      <div>
        password
        <input type="password" name="password" />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default Login
