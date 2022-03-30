import React from 'react'

const Error = ({ message, class }) => {
  if(message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}
export default Error
