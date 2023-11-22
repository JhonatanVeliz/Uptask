import { Link } from "react-router-dom";

import BtnLogout from "./BtnLogout";
import img from '../../public/img/profiles/user-perfil.svg';

const NavSettingsOptions = ({ isShow = false }) => {

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('userData'));
  const userName = localStorage.getItem('userName');

  return (
    <ul className={`navSettings__ul ${isShow ? 'navSettings__ul--active' : ''}`}>

      <li className="navSettings__li">
        <img className="navSettings__li__img" src={ img } alt="imagen del perfil" />
      </li>

      <li className="navSettings__li" >
        <Link to={`/editUser/${token}`}>
          Editar mi perfil
        </Link>
      </li>

      <li className="navSettings__li" >
        { userName }
      </li>

      <li className="navSettings__li navSettings__li__gmail" >
        { user.email }
      </li>

      <li className="navSettings__li" >
        <BtnLogout/> 
      </li>

    </ul>
  )
}

export default NavSettingsOptions