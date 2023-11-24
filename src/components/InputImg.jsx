import imgPerfil from '../../public/img/profiles/user-perfil.svg';
import imgPencil from '../assets/icons/pencil.svg'

const InputImg = ({ title = '', id = '', handleFileChange = () => { }, img = '' }) => {

  return (
    <>

      <div className="editUser__view__img">

        <img src={img || imgPerfil} alt="imagen de perfil" />

        <label htmlFor={id} className="editUser__view__img__label">
          <img src={ imgPencil } alt="imagen de perfil" />
        </label>

        <input
          className="editUser__data__img"
          type="file"
          id={id}
          onChange={handleFileChange}
        />

      </div>
    </>
  )
}

export default InputImg