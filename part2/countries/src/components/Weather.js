import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {
  const [ weather, setWeather] = useState([]) 
  const [ isWeather, setIsWeather] = useState(false)

  const api_key = process.env.REACT_APP_API_KEY
  const url = 'http://api.weatherstack.com'

  useEffect(() => {
    axios
    .get(`${url}/current?access_key=${api_key}&query=${country.capital}`)
    .then(response => {
      console.log('weather', response.data)
      setWeather(response.data.current)
      console.log(response.data.success)
      // prevent crashing by defining isWeather state true if returned data success=false is not defined yet
      if(response.data.success === undefined){
        setIsWeather(true)
      }
    })
  }, [country.capital])

  // console.log(isWeather)
  return (
    <div>
      { isWeather ? (
        <div>
          <h3>weather in {country.capital}</h3>
          <p><strong>temperature: </strong>{weather.temperature}</p>
          <img src={weather.weather_icons}></img>
          <p><strong>wind: </strong>{weather.wind_speed} mph, direction {weather.wind_dir}</p>
        </div>
      ) : (
        <div>no data</div>
        )
      }
    </div>
  )
}

export default Weather
