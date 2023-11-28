import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthorizationRoute = ({ navigateTo, redictTo, compareValue }) => {

  const [isShow, setIsShow] = useState(true);
  const { avatar, name, password } = useSelector(({ user }) => user.userData);

  const navigate = useNavigate();

  const verifyAuthorization = (e) => {

    e.preventDefault();

    const { userPassword } = e.target;

    if(userPassword.value !== password){
      navigate('/dashboard');
    }

    setIsShow(false);

  }

  return (

    <>
      {
        isShow &&
        <div className='authorization' >

          <form onSubmit={verifyAuthorization} className='authorization__form'>

            <div className='authorization__info'>

              <img
                className='authorization__info__img'
                src={avatar}
                alt="imagen de perfil"
              />

              <h2 className='authorization__info__title'>
                {name}
              </h2>

            </div>


            <div className='authorization__data'>

              <label htmlFor="authorization" className='authorization__data__title'>
                Confirmar Acceso
              </label>

              <input
                className='authorization__data__input'
                id="authorization"
                type="text"
                placeholder='Confirma tu Contraseña'
                name='userPassword'
              />

              <button type='submit' className='authorization__data__submit'>
                Confirmar
              </button>
            </div>

          </form>

        </div>
      }
    </>

  )
}

export default AuthorizationRoute