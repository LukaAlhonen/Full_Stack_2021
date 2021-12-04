import React, { useState, useEffect } from 'react'
import axios from 'axios'

const CountryD = (props) => (
    <div>
        <img src={props.country.flags.png} alt="Flag"/>
    </div>
)

const Country = ({ name, region}) => (
  <div>
    {name} {region}
  </div>
)

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

  const countriesToShow = countries.filter(
    country => country.name.common.toLowerCase().includes(filter.toLowerCase())
  )

  return(
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {countriesToShow.map(country =>
        <Country key={countries.indexOf(country)} name={country.name.common} />
      )}
    </div>
  )
}

export default App;
