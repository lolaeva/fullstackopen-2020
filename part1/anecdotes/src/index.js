import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => {
  return (
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(new Array(anecdotes.length).fill(0))

  const randomSelect = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  }
  const voteFor = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVote(copy);
  }

  const maxVote = Math.max(...votes);
  const highestVoted = anecdotes[votes.indexOf(maxVote)];
  // console.log(votes)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteFor} text='vote' />
      <Button onClick={randomSelect} text='next anecdote' />
      
      <h1>Anecdote with most votes</h1>
      <p>{highestVoted}</p>
      <p>has {maxVote} votes</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)