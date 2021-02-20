import React, { useState } from 'react'

const PersonForm = ({newName, newNumber, onNameChange, onNumberChange, addPerson}) => {
    return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={onNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm