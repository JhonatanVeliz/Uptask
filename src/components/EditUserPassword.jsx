import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// COMPONENTS
import InputPassword from './InputPassword';
import MessageError from './MessageError';
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
  const [ isThereError, setIsThereError ] = useState({ isError : false, text : '' });

  const changePasswordState = (value, name) => {
    setPasswordState({ ...passwordState, [name] : value });
  }

  const handleSave = async (e) => {

    e.preventDefault();

    const regexNumber = /\d/;

    if( passwordState.password !== password ){
      setIsThereError({ isError : true, text : 'La Contraseña Actual No Coincide' });
      return;
    }

    if(passwordState.passwordModify === '' && passwordState.passwordConfirm === ''){
      setIsThereError({ isError : true, text : 'Campos Vacíos' });
      return
    }
    
    if(passwordState.passwordModify !== passwordState.passwordConfirm){
      setIsThereError({ isError : true, text : 'La Contraseña a Actualizar No Coincide' });
      return;
    }

    if(!passwordState.passwordModify.match(regexNumber) || !passwordState.passwordConfirm.match(regexNumber)){;
      setIsThereError({ isError : true, text : 'Tu contraseña necesita almenos un numero' });
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

      <MessageError  invalid={isThereError.isError} text={isThereError.text} isLight={true} />

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