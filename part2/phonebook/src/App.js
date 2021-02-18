import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import axios from 'axios'
const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [showAll, setShowAll] = useState('') // for filtering displayed elements

  // effect-hooks
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  // event handler to the form element thatt will be called when the form is submitted
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    const isExists = persons.some(person => person.name === newName)
    if(isExists){
      alert(`${newName} is already added to phonebook`)
    } 
    else {
      setPersons(persons.concat(personObject))
      setNewName('') 
      setNewNumber('')
    }
  }

  // event handler that synchronizes the changes made to the input with the component's state
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }
  const personsToShow = showAll === '' ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showAll={showAll} handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson} />

      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App