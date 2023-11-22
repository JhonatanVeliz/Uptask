import imgPerfil from '../../public/img/profiles/user-perfil.svg'

const EditUserView = ({ name = '', password = '', img = '' }) => {

  return (
    <aside className='editUser__view'>

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
          <button className='editUser__view__btn'>
            Guardar
          </button>
        </li>
      </ul>

    </aside>
  )
}

export default EditUserView