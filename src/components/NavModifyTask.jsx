import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import NavModifyBtnUpdate from "./NavModifyBtnUpdate";
import NavModifyTaskDelete from "./NavModifyTaskDelete";
import NavModifyShowDescription from "./NavModifyShowDescription";
import ViewTaskConfirmDelete from "./ViewTaskConfirmDelete";
import { deleteMacroTask as deleteMacroTaskApi } from "../data/macroTasks";

import imgMore from '../assets/icons/more.svg';

import { deleteMacroTask } from "../features/macroTasks/macroTaskSlice";

const NavModifyTask = ({ changeDescription, showDescription, nameTask, taskId }) => {

  const { token } = useSelector(({ login }) => login);
  const [isShow, setIsShow] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);

  const changeState = () => setIsShow(!isShow);
  const changeConfirm = (value) => setIsShowConfirm(value);

  const navigate = useNavigate();
  const dispathc = useDispatch()

  const deleteTask = async () => {

    localStorage.setItem('taskDelete', true);

    if (token.includes('root')) {
      dispathc(deleteMacroTask(taskId));
      return navigate('/dashboard');
    }

    try {
      const taskDeleted = await deleteMacroTaskApi(import.meta.env.VITE_API_URL + `habits/${taskId}`, token);
      localStorage.setItem('taskDelete', true);
    }
    catch (error) { console.log(error); }

    navigate('/dashboard');
  }

  return (
    <>
      {
        isShowConfirm &&
        <ViewTaskConfirmDelete
          nameTask={nameTask}
          changeConfirm={changeConfirm}
          deleteTask={deleteTask}
        />
      }

      {
        isShow && <div className="div-remove" onClick={changeState}></div>
      }

      <nav className="viewTask__navModify">

        <button type="button" onClick={changeState} className="viewTask__navModify__more">
          <img src={imgMore} alt="mas opciones" />
        </button>

        <ul className={`viewTask__navModify__options ${isShow
          ? 'viewTask__navModify__options__active' : ''}`}>

          <NavModifyShowDescription
            changeDescription={changeDescription}
            showDescription={showDescription}
          />

          <NavModifyBtnUpdate taskId={taskId} />

          <NavModifyTaskDelete changeConfirm={changeConfirm} />

        </ul>

      </nav>
    </>
  )
}

export default NavModifyTask