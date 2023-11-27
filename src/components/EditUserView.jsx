import { Link } from 'react-router-dom';

import InputImg from './InputImg';

import imgCancel from '../assets/icons/cancel.svg';

const EditUserView = ({ name = '', password = '', avatar_view = '', changeDataUser = () => {}, changeDataAvatarView = () => {} }) => { 

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    const urlFile = URL.createObjectURL(file);

    if (!file.type.includes('image')) return;

    const reader = new FileReader(); // Crear un lector de archivos
    // Cuando el archivo se carga correctamente, obtener la URL y establecerla en el estado
    reader.onloadend = () => {
      changeDataUser(file, 'avatar');
    }
    reader.readAsDataURL(file); // Convertir el archivo a una URL base64
    changeDataAvatarView(urlFile);
  }

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