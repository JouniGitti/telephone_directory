import React from 'react'

import './PhoneNumber.css'

const PhoneNumber = ({person, handleDeleting}) => {
  return (
    <li className='number'>
      {person.name} Tel: {person.number} <button onClick={() => handleDeleting(person)}>delete</button> 
    </li>
  )
}

export default PhoneNumber