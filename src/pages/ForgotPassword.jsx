import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MessageError from '../components/MessageError'
import InputText from '../components/InputText'
import Loader from '../components/Loader'

const ForgotPassword = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isThereErrors, setIsThereErrors] = useState({ isError: false, error: '' });
  const [user, setUser] = useState({ email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const changeUser = (name, value) => {
    setUser({ [name]: value });
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
              <img src={''} alt="recupera tu contraseña" />
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
              name='email'
              title='email'
              value={user.email}
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