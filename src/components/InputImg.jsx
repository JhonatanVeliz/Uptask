import imgPerfil from '/img/profiles/user-perfil.svg';
import imgPencil from '../assets/icons/pencil.svg'

const InputImg = ({ id = '', handleFileChange = () => { }, avatar_view = '' }) => {

  return (
    <div className="editUser__data__perfil__img">

      <img src={avatar_view || imgPerfil} alt="imagen de perfil" />

      <label htmlFor={id} className="editUser__data__perfil__img__label">
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