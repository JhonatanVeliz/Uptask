import React from 'react';

import InputText from './InputText';

const EditUserPassword = ({ password = '' }) => {
  return (
    <div className='editUser__password'>

      <InputText 
        title='Actualizar Contraseña'
        changeData = ''
        name='password'
        value={ password }
      />

      <InputText 
        title='Repetir Contraseña'
        changeData = ''
        name='password'
        value={ password }
      />

      <button className='editUser__password__save'>Guardar</button>
    </div>
  )
}

export default EditUserPassword