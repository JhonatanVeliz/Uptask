import React from 'react'

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
        <li data-edit="data" onClick={changeState} >Editar</li>
        <li data-edit="password" onClick={changeState}>Contraseña</li>
      </ul>
    </nav>
  )
}

export default EditUserNav