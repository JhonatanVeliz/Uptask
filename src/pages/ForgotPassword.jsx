import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import MessageError from '../components/MessageError'
import InputText from '../components/InputText'
import Loader from '../components/Loader'

import { REGEX } from '../helpers';
import { updateResetPassword } from '../data/passwordReset'

import fingerPrint from '../assets/icons/fingerprint.svg';

const ForgotPassword = () => {

  const URL = useLocation();

  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isThereErrors, setIsThereErrors] = useState({ isError: false, error: '' });
  const [user, setUser] = useState({ password: '', password_confirmation : '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, password_confirmation } = user;

    if([password, password_confirmation].includes('')){
      setIsThereErrors({ isError : true, error : 'Faltan Datos' });
      return;
    }

    if(!password_confirmation.match(REGEX.number) || !password.match(REGEX.number)){
      setIsThereErrors({ isError : true, error : 'Tu contraseña debe incluir números' });
      return;
    }

    if(password != password_confirmation){
      setIsThereErrors({ isError : true, error : 'Tus Datos No Coinciden' });
      return;
    }

    try {
      const passwordReseted = 
        await updateResetPassword(import.meta.env.VITE_API_URL + `/password/edit?password=${password}&password_confirmation=${password_confirmation}&reset_password_token=${token}`);
      console.log('Se cambio contraseña');
    } 
    catch (error) {console.log(error);}

  }

  const changeUser = (value, name) => {
    setUser({ ...user, [name]: value });
  }

  useEffect( () => {

    const queryParams = new URLSearchParams(URL.search);
    const resetPasswordToken = queryParams.get('reset_password_token');
    setToken(resetPasswordToken);

  }, []);


  return (
    <>
      {
        isLoading && <Loader />
      }

      <section className='passwordReset'>

        <nav className="nav">
          <NavLink to="/dashboard">
            <h1 className='nav__icon'>UpConst</h1>
          </NavLink>
        </nav>

        <div className="passwordReset__container">

          <form className='passwordReset__form' onSubmit={handleSubmit}>

            <div className='passwordReset__form__logo'>
              <img src={fingerPrint} alt="recupera tu contraseña" />
            </div>

            <h2>
              Actualiza tu contraseña
            </h2>

            <MessageError
              invalid={isThereErrors.isError}
              text={isThereErrors.error}
              isLight={true}
            />

            <InputText
              name='password'
              title='Nueva contraseña'
              value={user.password}
              changeData={changeUser}
            />

            <InputText
              name='password_confirmation'
              title='Repetir contraseña'
              value={user.password_confirmation}
              changeData={changeUser}
            />

            <button type='submit' className='passwordReset__form__btn passwordReset__form__btn--submit'>
              Enviar
            </button>

          </form>

        </div>

      </section>
    </>
  )
}

export default ForgotPassword