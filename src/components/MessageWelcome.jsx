import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// FUNTIONALITIES SLICE
import { changeMessageStatus } from '../features/messageWelcome/messageWelcomeSlice';
// IMAGES
import imgSucces from '../assets/icons/succes.svg';

const MessageWelcome = () => {

  const [isShowMessage, setIsShowMessage] = useState(true);
  const { isShow } = useSelector( ({ isShowMessageWelcome }) => isShowMessageWelcome );
  const dispatch = useDispatch();

  const defaultUserName = 'user root';
  const userName = localStorage.getItem('userName') || defaultUserName;

  const removeComponent = () => setIsShowMessage(false);

  const disassembly = 4100;
  setTimeout( removeComponent, disassembly);

  useEffect(() => {
    if (!isShow) { setIsShowMessage(false) };

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