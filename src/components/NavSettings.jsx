import { useState } from "react";
import { useSelector } from "react-redux";

import NavSettingsOptions from "./NavSettingsOptions";
import imgSettings from '../assets/icons/settings.svg';

const NavSettings = () => {

  const [isShow, setIsShow] = useState(false);
  const { avatar } = useSelector(({ user }) => user.userData);

  const changeShow = () => {

    setIsShow(!isShow);

  };

  return (
    <>

      {
        isShow && <div className="div-remove" onClick={changeShow}></div>
      }

      <nav className="navSettings">

        <button className="navSettings__btn" onClick={changeShow}>
          <img src={avatar || imgSettings} alt="configuración del perfil" />
        </button>

        <NavSettingsOptions isShow={isShow} />

      </nav>

    </>
  )
}

export default NavSettings