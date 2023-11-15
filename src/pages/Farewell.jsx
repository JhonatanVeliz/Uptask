import { NavLink } from 'react-router-dom';

// Components
import FarewellImg from '../components/FarewellImg';

import profileErick from '../assets/profiles/erick.png';
import profileJhonatan from '../assets/profiles/jhonatan.png';

const Farewell = () => {

  return (
    <section className="farewell">

      <h1>Nos vemos la proxima vez !!!</h1>

      <p>Esperamos que te aya gustado la aplicación y le ayas sacado el mejor provecho posible, esperamos verte pronto !</p>
      
      <p>proyecto echo realidad por:</p>

      <div className='farewell__links-content'>

        <FarewellImg 
          img={ profileErick } 
          title='Erick'
          refTo='https://github.com/kotoykm'
        />

        <FarewellImg 
          img={ profileJhonatan } 
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