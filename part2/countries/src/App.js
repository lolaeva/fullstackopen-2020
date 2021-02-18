import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ targetCountry, setTargetCountry ] = useState('') // for filtering displayed elements
  
  // effect-hooks
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  // on input, get its value for filtering
  const handleFilter = (event) => {
    setTargetCountry(event.target.value)
  }
  // condition for filtering out countries based on search input
  const countriesToShow = targetCountry.length != 0 ? 
    countries.filter(country => country.name.toLowerCase().includes(targetCountry.toLowerCase())) : countries

  return (
    <div className="container">
      <h2>Search for a country name</h2>
      <Filter showAll={targetCountry} handleFilter={handleFilter}/>
      {countriesToShow.length > 10 ? 'Too much matches, specify another filter' 
      : <Countries countries={countriesToShow} /> }
    </div>
  )

}

export default App;
