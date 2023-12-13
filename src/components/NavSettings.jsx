import { useState } from "react";
import { useSelector } from "react-redux";

import NavSettingsOptions from "./NavSettingsOptions";
import imgSettings from '../assets/icons/settings.svg';

const NavSettings = () => {

  const [isShow, setIsShow] = useState(false);
  const { avatar } = useSelector( ({ user }) => user.userData);

  const changeShow = (e) => {

    if( e.target.className !== 'navSettings__btn' && isShow){
      console.log('entre');
      return
    }

    if(isShow){
      setIsShow(false);
      return;
    }
    
    setIsShow(true);
  };

  return (
    <nav className="navSettings">

      <button className="navSettings__btn" onClick={changeShow}>
        <img src={ avatar || imgSettings } alt="configuración del perfil"/>
      </button>

      <NavSettingsOptions isShow={ isShow }/>

    </nav>
  )
}

export default NavSettings