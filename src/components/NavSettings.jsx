import { useState } from "react";

import NavSettingsOptions from "./NavSettingsOptions";
import imgSettings from '../assets/icons/settings.svg'

const NavSettings = () => {

  const [isShow, setIsShow] = useState(false);

  const changeShow = () => setIsShow(!isShow);

  return (
    <nav className="navSettings">

      <button className="navSettings__btn" onClick={changeShow}>
        <img src={imgSettings} alt="configuración del perfil"/>
      </button>

      <NavSettingsOptions isShow={ isShow }/>

    </nav>
  )
}

export default NavSettings