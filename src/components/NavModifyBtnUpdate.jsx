import React from 'react';
import { NavLink } from 'react-router-dom';

import imgEdit from '../assets/icons/pencil.svg';

const NavModifyBtnUpdate = React.memo(() => {
  return (
    <NavLink to="/">
      <li className="viewTask__navModify__options__item">

        <img
          className="viewTask__navModify__options__item__img"
          src={imgEdit}
          alt="Editar tarea"
        />

        <span>Editar Tarea</span>
      </li>
    </NavLink>
  )
})

export default NavModifyBtnUpdate