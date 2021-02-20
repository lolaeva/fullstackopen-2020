import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import './index.css'

const App = () => {
  const [ persons, setPersons ]     = useState([]) 
  const [ newName, setNewName ]     = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ showAll, setShowAll ]     = useState('') // for filtering displayed elements
  const [ message, setMessage ]     = useState('')
  const [ errorMessage, setErrorMessage ]     = useState('')

  // effect-hooks
  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])

  // event handler to the form element thatt will be called when the form is submitted
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    // check if the same name exists
    const isNameExists = persons.some(person => person.name === newName)
    if(isNameExists){
      const existing_id = persons.find(person => person.name === newName).id
      if(!window.confirm(`${newName} is already added to phonebook. Replace old number with the new one? `)) return
      // if confirm is ok, replace existing person with new one
      personService
        .update(existing_id, personObject)
        .then(updatedPerson => {
          console.log('POST RESPONSE', updatedPerson)
          setPersons(persons.map(person => existing_id !== person.id ? person : updatedPerson))
          setMessage(`Updated ${personObject.name} successfully.`)
          setTimeout(() => setMessage(null), 5000)
          setNewName('') 
          setNewNumber('')
        })
        .catch(error => {
          console.log(error)
          setErrorMessage(`Information of ${personObject.name} has already been removed from the server.`)
          setTimeout(() => setErrorMessage(null), 5000)
        })
    }
    else {
      personService
        .create(personObject)
        .then(responsedPerson => {
          console.log('POST RESPONSE', responsedPerson)
          setPersons(persons.concat(responsedPerson))
          setMessage(`Added ${personObject.name} successfully`)
          setTimeout(() => setMessage(null), 5000)
          setNewName('') 
          setNewNumber('')
        })
    }
  }

  // event handler that synchronizes the changes made to the input with the component's state
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }
  const handleDelete = id => {
    console.log('TO BE DELETED', persons.find(person => person.id === id))
    if (!window.confirm('Delete person')) return
    let personToDelete = persons.find(person => person.id === id)

    personService
      .del(id)
      .then(() => {
        // alert(`Removed ${personToDelete.name}`)
        setMessage(`Removed ${personToDelete.name} successfully`)
        setTimeout(() => setMessage(null), 5000)
        setPersons(persons.filter(p => p.id !== id))
      })
  }
  // console.log(showAll.length)
  // console.log(persons)
  const personsToShow = showAll.length === 0 ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))
  console.log(message)

  return (
    <section className='phonebook__section'>
      <h2>Phonebook</h2>
      <Notification message={message} errorMessage={errorMessage}/>
      <Filter showAll={showAll} handleFilter={handleFilter}/>
      <h3>add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} 
        onNameChange={handleNameChange} onNumberChange={handleNumberChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} onDelete={handleDelete} />
    </section>
  )
}

export default App