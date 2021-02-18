import React, { useState, useEffect } from 'react'
import SingleCountry from './SingleCountry'


const Countries = ({countries, showAll}) => {
  const [ selectedCountry, setSelectedCountry] = useState() 
  let res = 'type correct filter'
  let res1 = ''
  console.log('heyyyyyyyyy', selectedCountry)

  useEffect(() => {
      if(countries.length === 1){
        setSelectedCountry(countries[0])
      }
    }, [countries])

  const shownCountries = countries.map(country => (
    <div key={country.numericCode}>
      <span>{country.name}</span>
      <button onClick={() => setSelectedCountry(country)} > Show </button>
    </div>
  ))

  // if(showAll.length > 0){
  //   if(countries.length <= 10 && countries.length > 1){
  //     res = shownCountries
  //     if(selectedCountry){
  //       res1 = <SingleCountry key={selectedCountry.numericCode} country={selectedCountry}/>
  //     }
  //   }
  //   else if(countries.length > 10) {
  //     res = 'too much'
  //   }
  //   else if(selectedCountry){
  //     res = <SingleCountry key={selectedCountry.numericCode} country={selectedCountry}/>
  //   }
  // }
  console.log(selectedCountry)
  return (
    <div>
      {/* {res}
      {res1} */}
      {countries.length > 1 && shownCountries}
      {selectedCountry && <SingleCountry key={selectedCountry.numericCode} country={selectedCountry}/>}
      
    </div>
  )
}

export default Countries