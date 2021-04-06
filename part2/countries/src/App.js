import React, { useState, useEffect } from 'react'
import axios from 'axios'


const CountryWithShowButton = ({country,handleShow}) =>{
  return (
    <div>
      <span>{country.name}</span>
      <button onClick={()=>handleShow(country.name)}>Show</button>
    </div>
  )
}

const WeatherData = ({weatherData}) =>{
  console.log(weatherData)
  return (<div></div>)
}
const Country = ({country}) =>{
  console.log(country)
  return (
  <div>
  <h1>{country.name}</h1>
  <span>Capital: {country.capital}</span>
  <span>Population: {country.population}</span>
  <h2>Languages</h2>
  {country.languages.map(language => (
    <li key={language.name}>{language.name}</li>
  ))}
  <img
    src={country.flag}
    width="100px"
    height="100px"
  />
  </div>
  )
}

const Countries = ({countries,handleShow}) => {
  if (countries.length > 10) {
    return (
        <div>Too many matches, specify another filter</div>
    )
  } else if(countries.length > 1){
    return (
      <div>
        {countries.map(country => (
          <CountryWithShowButton
            key={country.name}
            country={country}
            handleShow={handleShow}
          />
        ))}
      </div>
    )
  }else if(countries.length == 1){
    return (
      <div>
      <Country country={countries[0]}/>    
      </div>
    )
  }
  else{
    return <div></div>
  }  
}

const App = () => {
  const [query, setQuery] = useState("")
  const [countries,setCountries] = useState([])
  const [weatherData, setWeatherData] = useState(null)
  const handleQueryChange = (event) => {
    setQuery(event.target.value)
  }

  const handleShow = countryName => {
    setQuery(countryName);
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        if(query!==""){
          const queryResult = response.data.filter(country =>
            country.name.toLowerCase().includes(query.toLowerCase())
          )
          setCountries(queryResult)
        }
      })
  }, [query])

  useEffect(() => {
    const baseUrl = "http://api.weatherstack.com/current"
    const api_key = process.env.REACT_APP_API_KEY
    console.log(api_key)
    if (countries.length === 1) {
      const capital = countries.map(country => country.capital)
      if (capital[0]) {
        axios
          .get(`${baseUrl}?access_key=${api_key}&query=${capital[0]}`)
          .then(response => {
            setWeatherData(response.data)
          })
      }
    }
  }, [countries])

  return (
    <div>
    find countries<input value={query} onChange={handleQueryChange}/>
    <Countries countries={countries} handleShow={handleShow}/>
    <WeatherData weatherData={weatherData}/>
    </div>
  )
}

export default App
