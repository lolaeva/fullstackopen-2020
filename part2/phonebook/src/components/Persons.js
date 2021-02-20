import React, { useState } from 'react'

const Persons = ({personsToShow, onDelete}) => {
  return (
    <div className='persons__list'>
      {personsToShow.map(person => 
        <div className='persons__list__item' key={person.id}>
          <span className='persons__list__item__content'>{person.name}  {person.number}</span>
          <button className='persons__list__item__button' 
                  onClick={() => onDelete(person.id)}>
                    delete
          </button>
        </div>
      )}
    </div>
  )
}

export default Persons