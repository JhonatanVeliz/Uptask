import React from 'react'

const ViewTaskConfirmDelete = React.memo(({ nameTask = '', changeConfirm, deleteTask }) => {

  const cancelDelete = () => {
    changeConfirm(false);
  }

  const confirmDeleteTask = () => {
    deleteTask();
    changeConfirm(false);
  }

  return (
    <div className='viewTask__confirmDelete'>

      <p className="viewTask__confirmDelete__title">
        <span >¿ Desea Eliminar ?</span>
        <span className="viewTask__confirmDelete__title__name"> {nameTask}</span>
      </p>

      <div className="viewTask__confirmDelete__buttons">

        <button
          className="viewTask__confirmDelete__buttons__red"
          onClick={confirmDeleteTask}
        >
          Eliminar
        </button>

        <button
          className="viewTask__confirmDelete__buttons__orange"
          onClick={cancelDelete}
        >
          Cancelar
        </button>

      </div>

    </div>
  )
})
export default ViewTaskConfirmDelete