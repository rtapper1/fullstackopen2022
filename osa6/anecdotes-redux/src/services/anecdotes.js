import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const postAnecdote = async (anecodote) => {
  const res = await axios.post(baseUrl, {
    content: anecodote,
    votes: 0
  })
  return res.data
}

const getAnecdote = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const voteAnecdote = async (id) => {
  const res = await getAnecdote(id)
  const updatedAnecdote = {...res, votes: res.votes+1}
  const updated = await axios.put(`${baseUrl}/${id}`,
    updatedAnecdote
  )
  return updated.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, postAnecdote, getAnecdote, voteAnecdote }