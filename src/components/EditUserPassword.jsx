import React from 'react';

import InputText from './InputText';

const EditUserPassword = ({ user = {}, changeDataUser, changeIsEditUser }) => {

  const { passwordModify, passwordRepit } = user;

  const changeState = () => {
    changeIsEditUser(true);
  }

  return (
    <div className='editUser__password'>

      <InputText 
        title='Actualizar Contraseña'
        changeData={changeDataUser }
        name='passwordModify'
        value={ passwordModify }
      />

      <InputText 
        title='Repetir Contraseña'
        changeData={ changeDataUser }
        name='passwordRepit'
        value={ passwordRepit }
      />

      <button type='button' className='editUser__password__save' onClick={changeState}>
        Guardar
      </button>
    </div>
  )
}

export default EditUserPassword