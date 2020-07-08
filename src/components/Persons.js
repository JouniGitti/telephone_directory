import React from 'react'
import PhoneNumber from './PhoneNumber'

const Persons = ({persons, filterWord, onDeleteName}) => {
    const filterWithLowerCase = (person) => (
        person.name.toLowerCase().includes(
            filterWord.toLowerCase()
    ))
    return (
        <ul>
            {persons
            .filter(filterWithLowerCase)
            .map(person => 
                <PhoneNumber 
                key={person.name} 
                person={person} 
                handleDeleting={onDeleteName}/>
            )}
        </ul>
    )
}

export default Persons