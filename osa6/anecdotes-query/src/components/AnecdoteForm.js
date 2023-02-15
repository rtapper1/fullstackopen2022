import { useMutation, useQueryClient } from "react-query"
import { useContext } from "react"
import NotifContext from "../NotifContext"

import { createAnecdote } from "../requests"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  const [notif, dispatch] = useContext(NotifContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0},
      {
        onError: (err) => {
          if (content.length < 5) {
            dispatch({type: 'SET_MSG', 'payload': 'Too short anecdote, must be min 5 characters'})
          } else {
            dispatch({type: 'SET_MSG', 'payload': 'Something went wrong while adding an anecdote!'})
          }
        }
      })
    dispatch({type:'SET_MSG', payload: `Created anecdote '${content}'`})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
