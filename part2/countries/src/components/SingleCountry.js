import React, { useState } from 'react'

const SingleCountry = ({country}) => {
  return (
    <div key={country.numericCode}>
      <h2>{country.name}</h2>
      <p>{country.capital}</p>
      <p>{country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img src={country.flag}></img>
    </div>
  )
}

export default SingleCountry