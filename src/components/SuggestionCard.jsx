import React from 'react'

const SuggestionCard = ({username, message, handleClick}) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{username}</h5>
        <h6 className="card-text">{message}</h6>
        <button type='button' className="btn btn-danger" onClick={handleClick}>Eliminar</button>
      </div>
    </div>
  )
}

export default SuggestionCard