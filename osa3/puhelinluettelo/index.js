const express = require('express')
const app = express()

app.use(express.json()) // Enable json parser

// Hard coded list of persons
let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

// Generate somewhat unique id
const generateID = () => {
  const id = Math.floor(Math.random()*1000)
  return id
}

// Serve raw json data of persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Serve specific person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id) // Get id from url
  const person = persons.find(person => person.id === id) // Find requested person

  if(person){
    res.json(person)
  } else {
    res.status(404).end()
  }
})

// Delete specific person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

// Add new person
app.post('/api/persons/', (req, res) => {
  const body = req.body

  // Check if name or number field is empty and make sure name is unique
  if(!body.name || !body.number){
    return res.status(400).json({
      error: 'name and or number missing'
    })
  } else if(persons.some(person => person.name.includes(body.name))){
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(person)
  res.json(person)
})

// Serve date and number of people in phonebook
app.get('/info', (req, res) => {
  const date = new Date()
  const len = persons.length

  res.send(`<div><p>Phonebook has info for ${len} people</p><p>${date}</p></div>`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
