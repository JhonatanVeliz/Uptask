import React from 'react'

const ShowTaskDescription = React.memo(({ description = '' }) => {
  return (
    <p className="viewTask__text__description">{ description }</p>
  )
})

export default ShowTaskDescription