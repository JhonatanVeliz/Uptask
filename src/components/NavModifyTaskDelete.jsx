import React from 'react';
import imgDelete from '../assets/icons/delete.svg';

const NavModifyTaskDelete = React.memo(({ changeConfirm }) => {

  const changeIsShowConfirm = (e) => {

    const btn = e.target;
    const btnData = btn.getAttribute('data-value');

    if (btnData.includes('open')) {
      changeConfirm(true);
      return;
    }

    changeConfirm(false);
  }

  return (
    <li>

      <button className="viewTask__navModify__options__item" onClick={changeIsShowConfirm} data-value="open">

        <img
          className="viewTask__navModify__options__item__img"
          src={imgDelete}
          alt="Eliminar tarea"
        />

        <span>Eliminar Tarea</span>

      </button>
    </li>
  )
})

export default NavModifyTaskDelete