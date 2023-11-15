// ROUTER DOM
import { useNavigate } from "react-router-dom";

// SLICE
import { useDispatch } from "react-redux";

// HELPERS
import { userLogout } from "../data/login";
import { logout as logoutSlice } from "../features/login/loginSlice";

const BtnLogout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {

    const token = localStorage.getItem('token') || null;
    navigate('/farewell');
    dispatch(logoutSlice());

    if (!token) {
      const deleteDataNoRegistred = localStorage.clear();
      return;
    };

    try {
      await userLogout('https://upconstthebackendykm.onrender.com/logout', token);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <button className="login__form__btn-red" onClick={logout}>
      Cerrar Sesión
    </button>
  )
}

export default BtnLogout