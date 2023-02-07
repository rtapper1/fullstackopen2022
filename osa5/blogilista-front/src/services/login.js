import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {
  const request = axios
    .post(baseUrl, {
      username,
      password
    })
  return request.then(res => res.data)
}

export default login