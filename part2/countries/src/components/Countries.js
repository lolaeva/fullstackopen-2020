import React, { useState, useEffect } from 'react'
import SingleCountry from './SingleCountry'


const Countries = ({countries, weather}) => {
  // define state for selected (single) country
  const [ selectedCountry, setSelectedCountry] = useState() 

  useEffect(() => {
      if(countries.length === 1){ // if the list already contains single country
        setSelectedCountry(countries[0])
      }
    }, [countries])

  const shownCountries = countries.map(country => (
    <div key={country.numericCode}>
      <span>{country.name}</span>
      <button onClick={() => setSelectedCountry(country)} > Show </button>
    </div>
  ))

  console.log(selectedCountry)
  return ( 
    <div>
      {/* if more than one countries in the list, then show list of countries */}
      {countries.length > 1 && shownCountries}
      {/* if selectedCountry is not undefined, show that single country */}
      {selectedCountry && <SingleCountry key={selectedCountry.numericCode} country={selectedCountry} />}
    </div>
  )
}

export default Countries