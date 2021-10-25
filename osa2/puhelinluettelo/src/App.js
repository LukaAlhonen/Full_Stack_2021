import React, { useState } from 'react'

const Person = ({ person }) => <p>{person.name} {person.number}</p>

const Numbers = ({ persons }) => (
  <div>
    <h2>Numbers</h2>
    {persons.map(person => <Person key={person.name} person={person} />)}
  </div>
)

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244'}
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const handleNameChange = (event) => setNewName(event.target.value)
  const hanldeNumberChange = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={hanldeNumberChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers persons={persons} />
    </div>
  )

}

export default App
