import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// FUNTIONALITIES SLICE
import { changeMessageStatus } from '../features/messageWelcome/messageWelcomeSlice';
// IMAGES
import imgSucces from '../assets/icons/succes.svg';
// DEFAULT VALUES
const defaultUserName = 'userRoot';

const MessageWelcome = () => {

  const [isShowMessage, setIsShowMessage] = useState(true);
  const isShowMessageState = useSelector( state => state.isShowMessageWelcome.isShow );
  const dispatch = useDispatch();

  const userName = localStorage.getItem('userName') || 'user root';

  const removeComponent = () => setIsShowMessage(false);

  const disassembly = 4100;
  setTimeout( removeComponent, disassembly);

  useEffect(() => {
    if (!isShowMessageState) {
      setIsShowMessage(false)
    };
    dispatch(changeMessageStatus(false));  

  }, [])
  

  return (
    <>
      {
        isShowMessage
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