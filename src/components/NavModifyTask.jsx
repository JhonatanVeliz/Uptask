import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import imgMore from '../assets/icons/more.svg';

import { deleteMacroTask } from "../data/macroTasks";
import NavModifyBtnUpdate from "./NavModifyBtnUpdate";
import NavModifyTaskDelete from "./NavModifyTaskDelete";
import NavModifyShowDescription from "./NavModifyShowDescription";
import ViewTaskConfirmDelete from "./ViewTaskConfirmDelete";

const NavModifyTask = ({ changeDescription, showDescription, nameTask, taskId }) => {

  const {token} = useSelector( ({ login }) => login );
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const changeState = () => setIsShow(!isShow);
  const changeConfirm = ( value ) => setIsShowConfirm(value);

  const navigate = useNavigate();

  const deleteTask = async () => {
    try {
      const taskDeleted = await deleteMacroTask( import.meta.env.VITE_API_URL + `habits/${taskId}`, token);
      console.log('se elimino ahora recarga');
    } catch (error) {
      console.log(error);
    }

    navigate('/dashboard');
  }

  return (
    <>
      {
        isShowConfirm && 
          <ViewTaskConfirmDelete 
            nameTask={ nameTask } 
            changeConfirm={changeConfirm}
            deleteTask={ deleteTask } 
          />
      }


      <nav className="viewTask__navModify">

        <button type="button" onClick={changeState} className="viewTask__navModify__more">
          <img src={ imgMore } alt="mas opciones" />
        </button>

        <ul className={`viewTask__navModify__options ${isShow 
          ? 'viewTask__navModify__options__active' : ''}`}>
 
          <NavModifyBtnUpdate />

          <NavModifyTaskDelete changeConfirm={ changeConfirm } />

          <NavModifyShowDescription 
            changeDescription={ changeDescription } 
            showDescription={ showDescription }
          />

        </ul>

      </nav>
    </>
  )
}

export default NavModifyTask