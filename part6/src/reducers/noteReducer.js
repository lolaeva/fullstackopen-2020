
import { createStore } from 'redux'

const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      return state.concat(action.data)
    case 'TOGGLE_IMPORTANCE': {
      const id = action.data.id
      // search for a specific note object, the importance of which we want to change
      const noteToChange = state.find(n => n.id === id)
      // then create a new object, which is a copy of the original note
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      /*
      replace the state with a new state containing all 
      the notes which have not changed and the copy of the changed note changedNot
      */
      return state.map(note =>
        note.id !== id ? note : changedNote 
      )
     }
    default:
      return state
  }
}
const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'state changes are made with actions',
    important: false,
    id: 2
  }
})

export default noteReducer