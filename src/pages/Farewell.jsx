import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { changeMessageStatus } from '../features/messageWelcome/messageWelcomeSlice';

// Components
import FarewellImg from '../components/FarewellImg';

const Farewell = () => {

  const dispatch = useDispatch();

  useEffect( () => {
    const removeMessageState = dispatch(changeMessageStatus(true));  
    const removeMessageWelcomeStorage = localStorage.removeItem('userName');
  }, []);

  return (
    <section className="farewell">

      <h1>Nos vemos la proxima vez !!!</h1>

      <p>Esperamos que te aya gustado la aplicación y le ayas sacado el mejor provecho posible, esperamos verte pronto !</p>
      
      <p>proyecto echo realidad por:</p>

      <div className='farewell__links-content'>

        <FarewellImg 
          img="/img/profiles/erick.png"
          title='Erick'
          refTo='https://github.com/kotoykm'
        />

        <FarewellImg 
          img="/img/profiles/jhonatan.png"
          title='Jhonatan Veliz'
          refTo='https://github.com/JhonatanVeliz'
        />

      </div>

      <NavLink to="/" className="login__form__btn-red">
        Ir a pagina de inicio
      </NavLink>
      
    </section>
  )
}

export default Farewell