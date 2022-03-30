import React from 'react'

const Filter = ({ newSearch, handleSearch }) => (
  <div>
    filter: <input value={newSearch} onChange={handleSearch}/>
  </div>
)

export default Filter
