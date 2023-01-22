import { useState, useEffect } from 'react'
import personService from './services/persons'

const FilterField = ({value, onChange}) => (
  <div>
    filter shown with <input value={value} onChange={onChange}/>
  </div>
)

const Person = ({person, handleDelete}) => (
  <p>
    {person.name}&nbsp;
    {person.number}&nbsp;
    <button type="button" onClick={() => handleDelete(person)}>delete</button>
  </p>
)

const NumbersList = ({persons, filterValue, handleDelete}) => {
  if (filterValue === '') {
    return (
      <div>
        <h2>Numbers</h2>
        {persons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
      </div>
    )
  }
  const filteredPersons = searchPersons(persons, filterValue)
  return (
    <div>
      <h2>Numbers</h2>
      {filteredPersons.map(person => <Person key={person.id} person={person} handleDelete={handleDelete}/>)}
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

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.txt}
    </div>
  )
}

const isInList = (persons, new_name) => {
  const indx = persons.findIndex(person => person.name === new_name)
  return indx
}

const searchPersons = (persons, filterValue) => {
  return persons.filter(person => person.name.toLowerCase().includes(filterValue.toLowerCase()))
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [notifValue, setNotifValue] = useState({txt: 'This is a notification', type: 'ok'})

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  useEffect(() => {
    setTimeout(() => setNotifValue(null), 3000)
  }, [notifValue])

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
    const indxInList = isInList(persons, newName)
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if (indxInList !== -1) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      personService
        .modifyPerson(persons[indxInList].id, newPerson)
        .then((response) => {
          setPersons(persons.map(p => p.id !== persons[indxInList].id ? p : response))
          setNotifValue({txt: `${newName}'s number modified successfully!`, type: 'ok'})
        }, (err) => {
          console.log(`Something went wrong while changing number for ${newPerson.name}`)
          setNotifValue({txt: `Something went wrong while changing number for ${newPerson.name}`, type: 'error'})
        })
      setNewName('')
      setNewNumber('')
      return
    }
    console.log('Submitted:', newName)
    personService
      .addPerson(newPerson)
      .then(response => {
        setPersons(persons.concat(response))
        setNotifValue({txt: `${newName}'s number added successfully!`, type: 'ok'})
      }, (err) => {
        setNotifValue({txt: `Something went wrong while changing number for ${newPerson.name}`, type: 'error'})
      })
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {
    if (!window.confirm(`Are you sure you want to delete ${person.name}`)) {
      return
    }
    console.log('Deleted person ID:', person.id)
    personService
      .deletePerson(person.id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNotifValue({txt: `${person.name} deleted successfully!`, type: 'ok'})
      }, err => {
        console.log(`Person with ID ${person.id} was already deleted!`)
        setNotifValue({txt: `Person ${person.name} had already been deleted!`, type: 'error'})
        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifValue} />
      <FilterField value={filterValue} onChange={handleFilterChange}/>
      <AddNewForm onSubmit={handleSubmit}
                  nameValue={newName}
                  onNameChange={handleNameInputChange}
                  numbValue={newNumber}
                  onNumbChange={handleNumberInputChange}/>
      <NumbersList persons={persons} filterValue={filterValue} handleDelete={handleDelete}/>
    </div>
  )
}

export default App