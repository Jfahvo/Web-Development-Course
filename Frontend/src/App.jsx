import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import AppNotification from './components/AppNotification'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    persons.some(person => person.name === newName) ? alert(`${newName} is already added to phonebook`) : personService.create(nameObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setErrorMessage(`Added ${newName}`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    })
    
    
    

    
    
  }

  const deletePerson = id => {
    const url = `http://localhost:3001/api/persons/${id}`
    const person = persons.find(p => p.id === id)

    if (confirm(`Delete ${person.name}?`)) {
      axios.delete(url)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        console.log("deleted", response)
        setErrorMessage(`Deleted successfully`)

        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
    }

    

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    const searchValue = event.target.value
    setNewSearch(searchValue)

    setShowAll(searchValue.length === 0)
  }

  const personsToShow = showAll ? persons : persons.filter(person => person.name.includes(newSearch))



  return (
    <div>
      <h2>Phonebook</h2>
      <AppNotification message={errorMessage} />
      <div>
        filter shown with<input onChange={handleSearchChange}></input>
      </div>
      
      <h2>add a new</h2>
      <PersonForm addName={addName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App