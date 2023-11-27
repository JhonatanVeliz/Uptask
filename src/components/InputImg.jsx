import imgPerfil from '../../public/img/profiles/user-perfil.svg';
import imgPencil from '../assets/icons/pencil.svg'

const InputImg = ({ title = '', id = '', handleFileChange = () => { }, avatar_view = '' }) => {

  

  return (
    <div className="editUser__view__img">

      <img src={avatar_view || imgPerfil} alt="imagen de perfil" />

      <label htmlFor={id} className="editUser__view__img__label">
        <img src={imgPencil} alt="imagen de salir" />
      </label>

      <input
        className="editUser__data__img"
        type="file"
        id={id}
        onChange={handleFileChange}
      />

    </div>
  )
}

export default InputImg