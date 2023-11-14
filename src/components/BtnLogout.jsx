// ROUTER DOM
import { useNavigate } from "react-router-dom";

// SLICE
import { useDispatch } from "react-redux";
import { logout as logoutSlice } from "../features/login/loginSlice";

// HELPERS
import { userLogout } from "../data/login";

const BtnLogout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {

    const token = localStorage.getItem('token') || null;
    dispatch(logoutSlice());

    if (!token) {
      const deleteDataNoRegistred = localStorage.clear();
      navigate('/');
      return;
    };

    try {
      await userLogout('https://upconstthebackendykm.onrender.com/logout', token);
    } catch (error) {
      console.log(error);
      return;
    }

    setTimeout( () => {
      navigate('/');
    }, 1000)

  };

  return (
    <button onClick={logout}>
      Cerrar Sesión
    </button>
  )
}

export default BtnLogout