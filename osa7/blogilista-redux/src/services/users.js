import axios from 'axios'

const baseUrl = '/api/users'

const getAll = () => {
  return axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((err) =>
      console.log(`Something went wrong while getting users: ${err}`)
    )
}

export default { getAll }
