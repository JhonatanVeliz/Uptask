import React from 'react'

const ViewTaskData = React.memo(({ taskName = '', createdDate = '' }) => {
  return (
    <>

    <h1 className="viewTask__title">{ taskName }</h1>

    <p className="viewTask__text">
      <span className="viewTask__text__title">Tarea creada :</span>
      <span className="viewTask__text__date">{createdDate}</span>
    </p>

    </>
  )
})

export default ViewTaskData