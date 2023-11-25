import React, { useState } from 'react';
import { disassemblyTime } from "../utilities/index";
import imgSucces from '../assets/icons/user_succes.svg';

const MessageSucces = React.memo(({ title = '', message = '', id = '' }) => {

  const initialState = localStorage.getItem(id) || false;
  const [isShow, setIsShow] = useState(initialState);

  setTimeout(() => {
    setIsShow(false);
    localStorage.removeItem(id);
  }, disassemblyTime);

  return (
    <>
      {
        isShow &&
        <div className="dashboard__succes">
          <img className="dashboard__welcome__img" src={imgSucces} alt="bienvenido" />
          <span className="dashboard__welcome__title">{ title }</span>
          <span className="dashboard__welcome__message">{ message }</span>
        </div>
      }
    </>
  )
})

export default MessageSucces