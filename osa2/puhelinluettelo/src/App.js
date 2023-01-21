import { useState } from 'react'

const FilterField = ({value, onChange}) => (
  <div>
    filter shown with <input value={value} onChange={onChange}/>
  </div>
)

const Person = ({person}) => (
  <p>{person.name} {person.number}</p>
)

const NumbersList = ({persons, filterValue}) => {
  if (filterValue === '') {
    return (
      <div>
        <h2>Numbers</h2>
        {persons.map(person => <Person key={person.id} person={person}/>)}
      </div>
    )
  }
  const filteredPersons = searchPersons(persons, filterValue)
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

const AddNewForm = (props) => (
  <>
    <h2>add a new</h2>
    <form onSubmit={props.onSubmit}>
      <div>
        name: <input value={props.nameValue} onChange={props.onNameChange}/>
      </div>
      <div>
        number: <input value={props.numbValue} onChange={props.onNumbChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const isInList = (persons, new_name) => {
  const indx = persons.findIndex(person => person.name === new_name)
  return indx !== -1
}

const searchPersons = (persons, filterValue) => {
  return persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' , id: 1},
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
    { name: 'Dan Abramov', number: '12-43-234345', id: 3},
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (isInList(persons, newName)) {
      alert(`${newName} is already in phone book!`)
      return
    }
    console.log('Submitted:', newName)
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField value={filterValue} onChange={handleFilterChange}/>
      <AddNewForm onSubmit={handleSubmit}
                  nameValue={newName}
                  onNameChange={handleNameInputChange}
                  numbValue={newNumber}
                  onNumbChange={handleNumberInputChange}/>
      <NumbersList persons={persons} filterValue={filterValue}/>
    </div>
  )

}

export default App