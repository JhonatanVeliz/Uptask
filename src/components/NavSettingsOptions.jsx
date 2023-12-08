import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BtnLogout from "./BtnLogout";
import imgAvatar from '../../public/img/profiles/user-perfil.svg';
import imgEdit from '../assets/icons/pencil.svg';
import imgExit from '../assets/icons/exit.svg';

const NavSettingsOptions = ({ isShow = false }) => {

  const { token } = useSelector( ({ login }) => login );
  const userDefault = { email: ' no registrado ', name: 'user root' };
  const { email, name, avatar } = useSelector( ({ user }) => user.userData );

  return (
    <ul className={`navSettings__ul ${isShow ? 'navSettings__ul--active' : ''}`}>

      <li className="navSettings__li">
        <img className="navSettings__li__img" src={ avatar || imgAvatar } alt="imagen del perfil" />

        <p className="navSettings__li__info">
          <span>{ name || userDefault.name }</span>
          <span className="navSettings__li__info__email">{ email || userDefault.email }</span>
        </p>
        
      </li>

      {
        token !== 'root'
        ?
        <li className="navSettings__li" >

          <img className="navSettings__li__img" src={ imgEdit } alt="editar perfil" />

          <Link to={`/editUser/${name}`}>
            Editar mi perfil
          </Link>

        </li>
        : null
      }

      <li className="navSettings__li" >
        <img className="navSettings__li__img" src={ imgExit } alt="editar perfil" />
        <BtnLogout />
      </li>

    </ul>
  )
}

export default NavSettingsOptions