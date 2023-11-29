import React from 'react';
import { useSelector } from 'react-redux';
import imgKey from '../assets/icons/key.svg'

const EditUserNav = ({ changeIsEditUser }) => {

  const { avatar } = useSelector( ({ user }) => user.userData );

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
          <img src={ avatar } alt="actualizar perfil" />
        </li>

        <li data-edit="password" onClick={changeState} className='editUser__nav__item'>
          <img src={ imgKey } alt="actualizar password" />
        </li>
      </ul>
    </nav>
  )
}

export default EditUserNav