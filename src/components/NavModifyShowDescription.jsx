import React from 'react';

import imgSee from '../assets/icons/see.svg';

const NavModifyShowDescription = ({ changeDescription, showDescription }) => {
  return (
    <li>

      <button  className="viewTask__navModify__options__item" onClick={changeDescription}>

        <img
          className="viewTask__navModify__options__item__img"
          src={imgSee}
          alt="Editar tarea"
        />

        <span>
          {showDescription ? 'Ocultar Descripción' : 'Ver Descripción'}
        </span>

      </button>

    </li>
  )
}

export default NavModifyShowDescription