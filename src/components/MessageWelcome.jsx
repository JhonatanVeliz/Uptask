import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// FUNTIONALITIES SLICE
import { changeMessageStatus } from '../features/messageWelcome/messageWelcomeSlice';
// UTILITIES
import { disassemblyTime } from '../utilities';
// IMAGES
import imgSucces from '../assets/icons/succes.svg';

const MessageWelcome = () => {

  const [isShowMessage, setIsShowMessage] = useState(true);
  const { isShow } = useSelector( ({ isShowMessageWelcome }) => isShowMessageWelcome );
  const { name } = useSelector( ({ user }) => user.userData );
  const dispatch = useDispatch();

  const defaultUserName = 'user root';
  const userName = name || defaultUserName;

  const removeComponent = () => setIsShowMessage(false);

  setTimeout( removeComponent, disassemblyTime);

  useEffect(() => {

    if (!isShow) { 
      setIsShowMessage(false) 
    };

    dispatch(changeMessageStatus(false));  
  }, [])
  
  return (
    <>
      {
        isShowMessage &&
          <div className="dashboard__welcome">
            <img className="dashboard__welcome__img" src={imgSucces} alt="bienvenido" />
            <span className="dashboard__welcome__title">¡ Welcome !</span>
            <span className="dashboard__welcome__name">{userName}</span>
          </div>
      }
    </>

  )
}

export default MessageWelcome