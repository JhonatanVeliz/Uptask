import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

import InputText from '../components/InputText';
import MessageError from '../components/MessageError';
import Loader from '../components/Loader';

import { REGEX } from '../helpers';
import { resetPasswordApi } from '../data/passwordReset';

import fingerPrint from '../assets/icons/fingerprint.svg';
import fingerPrintGreen from '../assets/icons/fingerprint-green.svg';

const PasswordReset = () => {

  const [user, setUser] = useState({ email: '', name: '' });
  const [isThereErrors, setIsThereErrors] = useState({ isError: false, error: '' });
  const [isResolve, setIsResolve] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const changeUser = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.email.match(REGEX.email)) {
      setIsThereErrors({ isError: true, error: 'Porfavor ingresa un correo valido' });
      return;
    }

    if (!user.name.includes(' ')) {
      setIsThereErrors({ isError: true, error: 'campos vacíos' })
    }

    setIsLoading(true);

    try {
      const passwordRestted = await resetPasswordApi(import.meta.env.VITE_API_URL + 'users/password/forgot', user);
      setIsResolve(true);
      setIsLoading(false);
    }
    catch (error) { setIsThereErrors({ isError: true, error: 'email no encontrado' }) }

  }

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
              <img src={isResolve ? fingerPrintGreen : fingerPrint} alt="recupera tu contraseña" />
            </div>

            {
              isResolve
                ?
                <>
                  <h2>Enviado Correctamente</h2>

                  <p>Te pedimos que revises tu correo electronico</p>

                  <NavLink to="/" className="passwordReset__form__btn passwordReset__form__btn--succes">
                    Ir a Login
                  </NavLink>
                </>
                :
                <>
                  <h2>
                    Recupera tu contraseña
                  </h2>

                  <MessageError
                    invalid={isThereErrors.isError}
                    text={isThereErrors.error}
                    isLight={true}
                  />

                  <InputText
                    name='email'
                    title='email'
                    value={user.email}
                    changeData={changeUser}
                  />

                  <InputText
                    name='name'
                    title='nombre'
                    value={user.name}
                    changeData={changeUser}
                  />

                  <button type='submit' className='passwordReset__form__btn passwordReset__form__btn--submit'>
                    Enviar
                  </button>
                </>
            }

          </form>

        </div>

      </section>
    </>
  )
}

export default PasswordReset