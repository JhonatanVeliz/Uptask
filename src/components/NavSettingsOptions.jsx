import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import BtnLogout from "./BtnLogout";
import img from '../../public/img/profiles/user-perfil.svg';

const NavSettingsOptions = ({ isShow = false }) => {

  const { token } = useSelector( ({ login }) => login );
  const userDefault = { email: ' no registrado ', name: 'user root' };
  const { email, name } = useSelector( ({ user }) => user.userData );

  return (
    <ul className={`navSettings__ul ${isShow ? 'navSettings__ul--active' : ''}`}>

      <li className="navSettings__li">
        <img className="navSettings__li__img" src={img} alt="imagen del perfil" />
      </li>

      {
        token !== 'root'
        ?
        <li className="navSettings__li" >
          <Link to={`/editUser/${token}`}>
            Editar mi perfil
          </Link>
        </li>
        : null
      }

      <li className="navSettings__li" >
        { name || userDefault.name }
      </li>

      <li className="navSettings__li navSettings__li__gmail" >
        { email || userDefault.email}
      </li>

      <li className="navSettings__li" >
        <BtnLogout />
      </li>

    </ul>
  )
}

export default NavSettingsOptions