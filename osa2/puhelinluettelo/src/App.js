import React, { useState, useEffect } from 'react'
import personService from './services/persons.js'
import Person from './components/Person.js'
import PersonForm from './components/PersonForm.js'
import Filter from './components/Filter.js'
import Notification from './components/Notification.js'
import './index.css'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setSearch ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ className, setClassName ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if(person !== undefined) {
      if(window.confirm(`${newName} has already been added to the phonebook, replace the old number with a new one?`)){
        const id = person.id
        const personObject = {
          name: newName,
          number: newNumber,
          id: id
        }
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== id ? person : personObject))
            setNewName('')
            setNewNumber('')
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons[persons.length-1].id+1
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setClassName('notification')
          setMessage(`${returnedPerson.name} added`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = person => {
    const id = person.id
    if(window.confirm(`delete ${person.name}`)){
      personService
        .remove(id)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.id !== id))
        })
        .catch(error => {
          setPersons(persons.filter(p => p.id !== id))
          setClassName('error')
          setMessage(`${person.name} has already been removed`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={message}
        className={className}
      />
      <Filter
        handleSearch={handleSearch}
        newSearch={newSearch}
      />
      <h2>Add new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        hanldeNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <div>
        {personsToShow.map(person =>
          <Person
            key={person.name}
            person={person}
            removePerson={() => removePerson(person)}
          />
        )}
      </div>
    </div>
  )
}

export default App
