// ROUTER DOM
import { useNavigate } from "react-router-dom";

// SLICE
import { useDispatch, useSelector } from "react-redux";

// HELPERS
import { userLogout } from "../data/login";
import { logout as logoutSlice } from "../features/login/loginSlice";

const BtnLogout = () => {

  const dispatch = useDispatch();
  const { token } = useSelector( ({ login }) => login);
  const navigate = useNavigate();

  const logout = async () => {

    navigate('/farewell');
    dispatch(logoutSlice());

    if (!token || token === 'root') {
      const deleteDataNoRegistred = localStorage.clear();
      return;
    };

    try {
      await userLogout(import.meta.env.VITE_API_URL + 'logout', token);
    } catch (error) {
      console.log(error);
      return;
    }
  };

  return (
    <button className="navSettings__li__btn" onClick={logout}>
      Cerrar Sesión
    </button>
  )
}

export default BtnLogout