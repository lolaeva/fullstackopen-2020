import React, { useState } from 'react'

const Filter = ({showAll, handleFilter}) => {
  return (
    <section className='filter__section'>
      filter shown with: <input value={showAll} onChange={handleFilter} />
    </section>
  )
}

export default Filter