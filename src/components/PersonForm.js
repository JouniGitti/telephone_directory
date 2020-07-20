import React from 'react'

const PersonForm = ({handleNameAdding, nameValue, handleNameChanging, numberValue, handleNumberChanging}) => {
  //console.log (handleNameAdding, nameValue, handleNameChanging, numberValue, handleNumberChanging)
  return (
    <form onSubmit={handleNameAdding}>
      <div>
        name:
        <input
          value={nameValue}
          onChange={handleNameChanging} />
      </div>
      <div>
        number:
        <input
          value={numberValue}
          onChange={handleNumberChanging} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default PersonForm