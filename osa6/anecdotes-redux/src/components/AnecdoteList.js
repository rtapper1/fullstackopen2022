import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { notify, } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({anecdotes, filter}) => {
    return filter === '' ?
      anecdotes :
      anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const dispatch = useDispatch()

  const vote = async (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(notify(`you voted '${anecdote.content}'`, 5))
  }
  console.log(anecdotes)
  return (
    <>
    {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}

export default AnecdoteList