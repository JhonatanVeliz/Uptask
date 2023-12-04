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

      <div className="viewTask__confirmDelete-container">

        <h3 className='viewTask__confirmDelete__title'>¿ Desea Eliminar ?</h3>
        
        <p className="viewTask__confirmDelete__name">
          {nameTask}
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


    </div>
  )
})
export default ViewTaskConfirmDelete