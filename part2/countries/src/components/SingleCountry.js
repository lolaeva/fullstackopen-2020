import React, { useState } from 'react'
import Weather from './Weather'

const SingleCountry = ({country}) => {
  return (
    <div key={country.numericCode}>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(lang =>
          <li key={lang.iso639_1}>{lang.name}</li>)}
      </ul>
      <img className='flag' src={country.flag}></img>
      <Weather country={country} />
    </div>
  )
}

export default SingleCountry