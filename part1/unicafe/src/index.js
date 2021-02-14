import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// -------------- components ---------------
const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  if (!good && !neutral && !bad){
    return (
      <div>No feedback is given</div>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <Stat name='good' value={good} />
          <Stat name='neutral' value={neutral} />
          <Stat name='bad' value={bad} />
          <Stat name='all' value={all} />
          <Stat name='average' value={((good * 1 + bad * (-1)) / all).toFixed(2)} />
          <Stat name='positive' value={(good / all * 100).toFixed(2) + '%'} />
        </tbody>
      </table>
    )
  }
}

const Stat = props => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}



// --------------------------------- APP ------------------------------------
const App = () => {
  // define states for feedbacks, all initially set to 0
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // function definitions that increment states on button click
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick}  text='neutral'/>
      <Button onClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
