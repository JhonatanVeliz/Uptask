import { useState } from 'react';
import imgSucces from '../assets/icons/succes.svg'

const MessageWelcome = ({ userName = 'userRoot' }) => {

  const [isActive, setIsActive] = useState(true);

  const removeComponent = () => {
    setIsActive(false);
  }

  setTimeout( () => {
    removeComponent();
  }, 4100);

  return (

    <>
      {
        isActive
          ?
          <div className="dashboard__welcome">
            <img className="dashboard__welcome__img" src={imgSucces} alt="bienvenido" />
            <span className="dashboard__welcome__title">¡ Welcome !</span>
            <span className="dashboard__welcome__name">{userName}</span>
          </div>
          : null
      }
    </>

  )
}

export default MessageWelcome