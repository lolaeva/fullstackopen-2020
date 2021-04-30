import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Notes from './components/Notes'
import NewNote from './components/NewNote'



const App = () => {
  return(
    <div>
      <ul>
        {store.getState().map(note=>
          <li key={note.id}>
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
        </ul>
    </div>
  )
}

export default App