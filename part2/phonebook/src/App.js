import React, { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

const Input =({label,value,onChange})=>{
  return(
  <div>
  <label>{label}</label>
  <input type="text" value={value} onChange={onChange}/>
  </div>
  )
}

const PersonForm = ({onSubmit,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return(
  <form onSubmit={onSubmit}>
    <Input label="Name:" value={newName} onChange={handleNameChange}/>
    <Input label="Number:" value={newNumber} onChange={handleNumberChange}/>
    <div>
      <button type="submit">
        Add
      </button>
    </div>
  </form>
  )
}

const Persons = ({persons,search,searchedPersons,handleDelete})=>{
  if(search==="")
    return (
      <ul>
        {persons.map(person=><li key={person.id}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>Delete</button></li>)}
      </ul>
    )
  else
    return(
      <ul>
        {searchedPersons.map(person=><li key={person.id}>{person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>Delete </button></li>)}
      </ul>
    )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ searchedPersons, setSearchedPersons] =useState(null)
  const [ message, setMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name:newName,
      number:newNumber,
      id:persons.length+1
    }  

    const existed = persons.some((person)=>person.name===newName)
    if (existed){
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
      if(confirmUpdate){
        const person = persons.find((p) => p.name === newName)
        axios
        .put(`${baseUrl}/${person.id}`, personObject)
        .then(response => {
          setPersons(
            persons.map((person) =>
              person.name !== newName ? person : response.data
            )
          )
        })
        setNewName('')
        setNewNumber('')
        return
      }else{
        return
      }  
      
    }
    axios
    .post(baseUrl, personObject)
    .then(response => {
      setPersons(persons.concat(response.data))
      setMessage(
        `Added ${response.data.name}`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    })
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    const filtered= persons.filter((person)=>(
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    ))
    setSearchedPersons(filtered)
  }
  
  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id)
    const confirmDelete = window.confirm(`Delete ${person.name}?`)
    if (confirmDelete) {
      axios
      .delete(`${baseUrl}/${person.id}`,)
      setPersons(persons.filter((person) => person.id !== id))
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Input label="filter shown with" value={search} onChange={handleSearchChange}/>
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} search={search} searchedPersons={searchedPersons} handleDelete={handleDelete}/>
    </div>
  )
}

export default App