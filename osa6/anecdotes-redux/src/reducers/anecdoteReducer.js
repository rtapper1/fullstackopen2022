import { createSlice } from "@reduxjs/toolkit"

import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const vote = state.find(s => s.id === action.payload)
      return state.map(s => s.id !== action.payload ? s : {...vote, votes: vote.votes+1})
    },
    addAnecdote(state, action) {
      state.push(
        asObject(action.payload)
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { voteAnecdote, addAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.postAnecdote(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (id) => {
  return async dispatch => {
    await anecdoteService.voteAnecdote(id)
    dispatch(voteAnecdote(id))
  }
}

export default anecdoteSlice.reducer