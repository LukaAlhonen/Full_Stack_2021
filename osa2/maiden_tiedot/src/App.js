import React, { useState, useEffect } from 'react'
import axios from 'axios'

<<<<<<< HEAD
const Country = ({ name, region}) => (
  <div>
    {name} {region}
  </div>
)
=======
const Country = ({ name }) => (
  <div>
    {name}
  </div>
)
/*

*/

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
  </div>
  )
}
>>>>>>> master

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
<<<<<<< HEAD
  const [ retVal, setRetval ] = useState(<div></div>)
=======
>>>>>>> master

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response =>{
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)
<<<<<<< HEAD

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
=======
  const getCountries = (cs) => {
    let retval = cs.map(country =>
      <Country key={countries.indexOf(country)} name={country.name.common} />
    )
    if(cs.length > 10){
      retval = <div>Too many matches, specify another filter</div>
    } else if(cs.length === 1){
      retval = <CountryDetails country={cs[0]} />
    }
    return retval
  }

  const countriesToShow = getCountries(countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
>>>>>>> master
  )

  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
<<<<<<< HEAD
      {countriesToShow.map(country =>
        <Country key={countries.indexOf(country)} name={country.name.common} />
      )}
=======
      {countriesToShow}
>>>>>>> master
    </div>
  )
}

export default App;
