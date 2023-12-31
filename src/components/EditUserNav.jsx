import React from 'react';
import imgKey from '../assets/icons/key.svg'
import imgPerfil from '../assets/icons/user-perfil.svg'

const EditUserNav = ({ changeIsEditUser }) => {

  const changeState = ( e ) => {

    const target = e.target;
    const value = target.getAttribute('data-edit') || null;

    if(value === null) return;

    if(value === 'data'){
      changeIsEditUser(true);
      return;
    }

    changeIsEditUser(false);
  }

  return (
    <nav className="editUser__nav">
      <ul>
        <li data-edit="data" onClick={changeState} className='editUser__nav__item'>
          <img src={ imgPerfil } alt="actualizar perfil" />
        </li>

        <li data-edit="password" onClick={changeState} className='editUser__nav__item'>
          <img src={ imgKey } alt="actualizar password" />
        </li>
      </ul>
    </nav>
  )
}

export default EditUserNav