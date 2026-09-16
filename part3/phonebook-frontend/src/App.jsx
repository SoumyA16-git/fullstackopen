import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'
import './App.css'

const Filter = ({ search, onChange }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={onChange} />
    </div>
  )
}

const PersonForm = ({
  newName,
  newNumber,
  onNameChange,
  onNumberChange,
  onSubmit
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map(person =>
        <p key={person._id}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person._id, person.name)}>
            delete
          </button>
        </p>
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showMessage = (text, type) => {
    setMessage(text)
    setMessageType(type)

    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(
      person => person.name.toLowerCase() === newName.toLowerCase()
    )

    if (existingPerson) {
      const replace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )

      if (!replace) {
        return
      }

      const changedPerson = {
        name: existingPerson.name,
        number: newNumber
      }

      personService
        .update(existingPerson._id, changedPerson)
        .then(returnedPerson => {
          setPersons(
            persons.map(person =>
              person._id === existingPerson._id
                ? returnedPerson
                : person
            )
          )

          setNewName('')
          setNewNumber('')
          showMessage(`Updated ${newName}`, 'success')
        })
        .catch(() => {
          showMessage(
            `Information of ${newName} was already removed from server`,
            'error'
          )
        })

      return
    }

    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${newName}`, 'success')
      })
      .catch(error => {
  showMessage(error.response.data.error, 'error')
})
  }

  const deletePerson = (id, name) => {
    const confirmDelete = window.confirm(
      `Delete ${name}?`
    )

    if (!confirmDelete) {
      return
    }

    personService
      .remove(id)
      .then(() => {
        setPersons(
          persons.filter(person => person._id !== id)
        )
        showMessage(`Deleted ${name}`, 'success')
      })
      .catch(() => {
        showMessage(
          `${name} was already removed from server`,
          'error'
        )
      })
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification
        message={message}
        type={messageType}
      />

      <Filter
        search={search}
        onChange={event => setSearch(event.target.value)}
      />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        onNameChange={event => setNewName(event.target.value)}
        onNumberChange={event => setNewNumber(event.target.value)}
        onSubmit={addPerson}
      />

      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App