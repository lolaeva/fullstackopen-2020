import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  return (
    <div>
      <div>
        <button onClick={() => store.dispatch({ type:'GOOD' })}>good</button> 
        <button onClick={() => store.dispatch({ type:'OK' })}>neutral</button> 
        <button onClick={() => store.dispatch({ type:'BAD' })}>bad</button>
        <button onClick={() => store.dispatch({ type:'ZERO' })}>reset stats</button>
      </div>
      <div>
        <div>good {store.getState().good}</div>
        <div>neutral {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)