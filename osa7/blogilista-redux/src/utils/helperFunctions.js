const getUser = () => {
  return (
    JSON.parse(window.localStorage.getItem('user')) || {
      username: '',
      name: '',
      token: '',
    }
  )
}

export default getUser
