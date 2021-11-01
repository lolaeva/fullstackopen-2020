import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, removeNotification } from '../reducers/notificationReducer'




const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div >
      <div>
      {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()

  const handleVote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    console.log(anecdote.content)
    dispatch(showNotification(`You voted for  ${anecdote.content}`))
    setTimeout(() => dispatch(removeNotification()), 5000)
  }

  const anecdotes = useSelector(state => {
    if (state.filter === '') 
      return state.anecdotes
    console.log(state.anecdotes)
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  return (
    <div>
      {anecdotes.sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote}  handleClick={() => handleVote(anecdote)} />
      )}
    </div>
  )
}

export default Anecdotes