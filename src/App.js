import React, { useState, useEffect } from 'react'

import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/personService'
import Notification from './components/notification'

// for the app to run you need to start the json-server also: npm run server
// uses the file db.json as a "database"
// start the app: npm start


const App = () => {

  const [ newName, setNewName ] = useState('') 
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ persons, setPersons ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  const additionMessage = `Added ${newName}`
  const deletionMessage = 'Deleted '
  const updateMessage = 'Updated '

  useEffect(() => {
    personService
    .getAll()
    .then(fullList => {
      setPersons(fullList)
    })
    .catch(error => {
      console.log('loading of personslist failed with error: ', error)
    })
  }, [] )

  const handleCreate = () => {
    const newPerson = { 
      name: newName, 
      number: newNumber 
    }
    personService
      .create(newPerson)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setNotificationMessage(additionMessage)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 3000)
      })
      .catch(error => {
        setNotificationMessage(error.response.data.error)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000) 
      })
  }

  const handleDelete = deletedName => {
    const okWithDelete = window.confirm (`Do you wish to delete the name ${deletedName.name} from the list?`)
    if (okWithDelete) {
      personService
        .remove(deletedName.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== deletedName.id))
          setNotificationMessage(deletionMessage + deletedName.name)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(error => {
          setNotificationMessage(deletedName.name + ' already deleted from the database.')
          console.log('error with deleting a person. Error code: ', error)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
    }
  }

  const handleUpdateNumber = (name) => {
    const previousName = persons.find(per => per.name === name)
    const updatedName = {...previousName, number: newNumber}

    if (name === updatedName.name) {
        window.confirm (`Do you wish to change the number for ${updatedName.name}?`)
        personService
        .update(updatedName.id, updatedName)
        .then (returnedName => {
        setPersons(
          persons.map(
            person => person.id !== previousName.id ? person: returnedName 
          ))
          setNotificationMessage(updateMessage + updatedName.name)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
    }
  }

  const handleAddName = (event) => {
    event.preventDefault()
    const nameAlreadyExists = persons.some(element => element.name === newName)
    if (nameAlreadyExists) {
      handleUpdateNumber(newName)
    }
    if (!nameAlreadyExists) {
      handleCreate()
    }
    // These clear the input fields in the NewPerson i.e. also in the form
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {  
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {  
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h3>Phonebook APP</h3>
      <Notification message={notificationMessage} />
      <Filter filter={newFilter} onFilterChange={handleFilterChange} />
      <h3>Add a new name:</h3>
      <PersonForm 
        handleNameAdding={handleAddName}
        handleNameChanging={handleNameChange}   
        handleNumberChanging={handleNumberChange}
        nameValue={newName}
        numberValue={newNumber}
        />
      <h3>The numbers on the list are:</h3>
      <Persons persons={persons} filterWord={newFilter} onDeleteName={handleDelete}/>
    </div>
  )
}

export default App