import { Link } from 'react-router-dom';

import imgPerfil from '../../public/img/profiles/user-perfil.svg';
import imgCancel from '../assets/icons/cancel.svg';

const EditUserView = ({ name = '', password = '', img = '', handleSave = () => {}}) => { 

  return (
    <aside className='editUser__view'>

      <Link to={'/dashboard'} className='editUser__view__cancel'>
        <img src={ imgCancel } alt="salir" />
      </Link>

      <div className="editUser__view__img">
        <img src={ img || imgPerfil } alt="imagen de perfil" />
      </div>

      <ul className='editUser__view__ul'>

        <li className='editUser__view__li'>
          { `Nombre: ${ name }`}
        </li>

        <li className='editUser__view__li'>
          { `Contraseña: ${ password }`}
        </li>

        <li className='editUser__view__li'>
          <button onClick={handleSave} className='editUser__view__btn'>
            Guardar
          </button>
        </li>

      </ul>

    </aside>
  )
}

export default EditUserView