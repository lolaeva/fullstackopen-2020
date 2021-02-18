import React, { useState } from 'react'

const Filter = ({showAll, handleFilter}) => {
  return (
    <div>
      <p>find countries</p>
      <input value={showAll} onChange={handleFilter} />
    </div>
  )
}

export default Filter