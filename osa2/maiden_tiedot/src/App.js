import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({ name, handleClick }) => {
  const handleClick2 = () => handleClick(name)
  return (
    <div>
      {name} <button onClick={handleClick2}>show</button>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  const languages = Object.values(country.languages)
  return (
  <div>
    <h1>{country.name.common}</h1>
    <div>capital {country.capital}</div>
    <div>population {country.population}</div>
    <h2>languages</h2>
    <ul>
      {languages.map((language, i) =>
          <li key={i}>
            {language}
          </li>
      )}
    </ul>
    <img src={country.flags.png} alt="no flag"/>
    <h3>Weather in {country.capital}</h3>
  </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      Filter: <input value={props.filter} onChange={props.handleFilter}/>
    </div>
  )
}

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState("")

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>{
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)
  const getCountries = (cs) => {
    let retval = cs.map(country =>
      <Country key={countries.indexOf(country)} name={country.name.common} handleClick={handleClick}/>
    )
    if(cs.length > 10){
      retval = <div>Too many matches, specify another filter</div>
    } else if(cs.length === 1){
      retval = <CountryDetails country={cs[0]} weather={weather}/>
    }
    return retval
  }
  const handleClick = (name) => {
    setFilter(name)
  }

  const countriesToShow = getCountries(countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  )

  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {countriesToShow}
    </div>
  )
}

export default App;
