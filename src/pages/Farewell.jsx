import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
// REDUX
import { useDispatch } from 'react-redux';
import { changeMessageStatus } from '../features/messageWelcome/messageWelcomeSlice';
import { createMacroTasksState } from '../features/macroTasks/macroTaskSlice';
import { changeUserState } from '../features/user/userSlice';

// Components
import FarewellImg from '../components/FarewellImg';
import { logout } from '../features/login/loginSlice';

const Farewell = () => {

  const dispatch = useDispatch();

  const hanldeLogOut = () => {
    const removeMessageState = dispatch(changeMessageStatus(true));  
    const removeLocalStorage = localStorage.clear();
    const removeSessionStorage = sessionStorage.clear();
    const removeMacroTasks = dispatch(createMacroTasksState([]));
    dispatch(changeUserState({ name: '', email : '', password : '', id : '', avatar : '', isRegistered : false}));
    dispatch(logout());
  }

  return (
    <section className="farewell">

      <h1>Nos vemos la próxima vez !!!</h1>

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

      <NavLink to="/login" className="login__form__btn-red" onClick={hanldeLogOut}>
        Ir a pagina de inicio
      </NavLink>
      
    </section>
  )
}

export default Farewell