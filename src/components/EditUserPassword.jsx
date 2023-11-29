import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import InputPassword from './InputPassword';
import BtnsSubmit from './BtnsSubmit';

import { updateUserPassword } from '../data/login';
import { changeUserState } from '../features/user/userSlice';

const EditUserPassword = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector( ({ login }) => login );
  const { name, email, password, id, avatar, isRegistered } = useSelector( ({ user }) => user.userData );
  const initialState = { password : '', passwordModify : '', passwordConfirm : '' };
  const [ passwordState, setPasswordState ] = useState(initialState);

  const changePasswordState = (value, name) => {
    setPasswordState({ ...passwordState, [name] : value });
  }

  const handleSave = async (e) => {

    e.preventDefault();

    const regexNumber = /\d/;

    if( passwordState.password !== password ){
      console.log('La contraseña del usuario no coincide');
      return;
    }

    if(passwordState.passwordModify === '' && passwordState.passwordConfirm === ''){
      console.log('Campos vacios');
      return
    }
    
    if(passwordState.passwordModify !== passwordState.passwordConfirm){
      console.log('La contraseña a actualizar no coincide');
      return;
    }

    if(!passwordState.passwordModify.match(regexNumber) || !passwordState.passwordConfirm.match(regexNumber)){;
      console.log('No contiene numeros');
      return
    }

    try {
      const { passwordModify } = passwordState;
      const passwordUpdated = updateUserPassword( import.meta.env.VITE_API_URL + 'sign_up', passwordModify, token );
      dispatch(changeUserState({ name, email, password : passwordModify, id, avatar, isRegistered }));
    } 
    catch (error) { console.log(error); }

    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSave} className='editUser__password'>

      <h2 className='editUser__password__title'>Edita Tu Contraseña:</h2>

      <InputPassword 
        title='Contraseña Actual'
        changeData={changePasswordState }
        name='password'
        value={ passwordState.password }
      />

      <InputPassword 
        title='Nueva Contraseña'
        changeData={changePasswordState }
        name='passwordModify'
        value={ passwordState.passwordModify }
      />

      <InputPassword 
        title='Repetir Nueva Contraseña'
        changeData={ changePasswordState }
        name='passwordConfirm'
        value={ passwordState.passwordConfirm }
      />

      <BtnsSubmit />

    </form>
  )
}

export default EditUserPassword