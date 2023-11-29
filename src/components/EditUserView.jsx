import { Link } from 'react-router-dom';

import InputImg from './InputImg';

import imgCancel from '../assets/icons/cancel.svg';

const EditUserView = ({ name = '', password = '', avatar_view = '', changeDataUser = () => {}, changeDataAvatarView = () => {} }) => { 

  return (
    <aside className='editUser__view'>

      <Link to={'/dashboard'} className='editUser__view__cancel'>
        <img src={ imgCancel } alt="salir" />
      </Link>

      <InputImg 
        handleFileChange={ handleFileChange }
        title="Ingresar una imagen"
        id="editUser-img"
        avatar_view={avatar_view}
      />

      <ul className='editUser__view__ul'>

        <li className='editUser__view__li'>
          { `Nombre: ${ name }`}
        </li>

        <li className='editUser__view__li'>
          { `Contraseña: ${ password }`}
        </li>

        <li className='editUser__view__li'>
          <button type='submit' className='editUser__view__btn'>
            Guardar
          </button>
        </li>

      </ul>

    </aside>
  )
}

export default EditUserView