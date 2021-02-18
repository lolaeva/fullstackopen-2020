import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Countries from './components/Countries'
import axios from 'axios'


const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ showAll, setShowAll ] = useState('') // for filtering displayed elements


  // effect-hooks
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  const handleFilter = (event) => {
    setShowAll(event.target.value)
  }

  const countriesToShow = showAll.length != 0 ? 
    countries.filter(country => country.name.toLowerCase().includes(showAll.toLowerCase()))
    : countries

  // const match = countriesToShow.length > 10 ? 'too much' : 

  return (
    <div className="container">
      <h2>Search for a country name</h2>
      <Filter showAll={showAll} handleFilter={handleFilter}/>
      {countriesToShow.length > 10 ? 'too much' : <Countries countries={countriesToShow} showAll={showAll} /> }
      
    </div>
  )

}

export default App;
