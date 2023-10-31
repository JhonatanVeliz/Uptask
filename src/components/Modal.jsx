import React from 'react'

const Modal = ({ title = '', text = '', removeModal = '' }) => {
  return (
    <aside className='modal'>

      <div className="modal__content">

        <h2>{title}</h2>
        <p>{text}</p>

        <button onClick={removeModal}>
          aceptar
        </button>

      </div>

    </aside>
  )
}

export default Modal