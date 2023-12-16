import React, {useState} from 'react';
import imgDelete from '../assets/icons/delete.svg';
import LoaderApp from '../pages/LoaderApp';

const NavModifyTaskDelete = React.memo(({ changeConfirm }) => {

  const [isLoading, setIsLoading] = useState(false);

  const changeIsShowConfirm = (e) => {

    setIsLoading(true);

    const btn = e.target;
    const btnData = btn.getAttribute('data-value');

    if (btnData.includes('open')) {
      changeConfirm(true);
      return;
    }

    changeConfirm(false);
  }

  return (
    <>
      { isLoading && <LoaderApp /> }

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
    </>
  )
})

export default NavModifyTaskDelete