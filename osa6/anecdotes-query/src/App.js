import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotifContext from './NotifContext'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useContext(NotifContext)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'SET_MSG', payload: `Anecdote '${anecdote.content}' voted`})
  }
  const res = useQuery('anecdotes', getAnecdotes)

  if ( res.isLoading ) {
    return <div>loading data...</div>
  } if (res.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }
  const anecdotes = res.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
