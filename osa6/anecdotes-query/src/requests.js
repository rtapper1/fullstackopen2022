import axios from "axios"

const base_url = 'http://localhost:3001/anecdotes'


export const getAnecdotes = () => {
  return axios.get(base_url)
    .then(
      res => res.data
    )
    .catch(
      err => console.log('Error: ', err)
    )
}

export const createAnecdote = (newAnecdote) => {
  return axios.post(base_url, newAnecdote)
    .then(res => res.data)
}

export const updateAnecdote = (newAnecdote) => {
  return axios
    .put(`${base_url}/${newAnecdote.id}`, newAnecdote)
    .then(res => res.data)
}