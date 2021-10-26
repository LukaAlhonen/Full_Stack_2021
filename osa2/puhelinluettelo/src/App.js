import React, { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Persons = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map(person => <Person key={person.name} person={person} />)}
  </div>
)

const Filter = ({ newSearch, handleSearch }) => <div>filter: <input value={newSearch} onChange={handleSearch}/></div>

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
    <div>number: <input value={props.newNumber} onChange={props.hanldeNumberChange}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const App = () => {
  const [ persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1231244' },
    {
      name: 'Luka Alhonen',
      number: '0451455399'
    },
    {
      name: 'Kalle Kommunist',
      number: '6969696969696'
    }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setSearch ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.find( ({ name }) => name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName, number: newNumber }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleSearch = (event) => setSearch(event.target.value)
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} newSearch={newSearch}/>
      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} hanldeNumberChange={handleNumberChange} />
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
