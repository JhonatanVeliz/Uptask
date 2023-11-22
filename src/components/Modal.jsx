import React, { useState } from 'react'

const Modal = ({ title = '', text = '' }) => {

  const [isShow, setIsShow] = useState(true);

  const removeModal = () => {
    setIsShow(!isShow);
  };

  return (
    <>
      {
        isShow &&
        <aside className='modal'>

          <div className="modal__content">

            <h2>{title}</h2>
            <p>{text}</p>

            <button onClick={removeModal}>
              aceptar
            </button>

          </div>

        </aside>
      }
    </>
  )
}

export default Modal