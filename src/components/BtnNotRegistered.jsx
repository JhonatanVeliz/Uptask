import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as loginSlice } from "../features/login/loginSlice";

const BtnNotRegistered = () => {

  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  const loginRoot = () => {
    dispatch(loginSlice('root'));
  }

  return (
    !user
      ? <NavLink
        to={'/dashboard'}
        className="nav__user-root"
        onClick={loginRoot}
      >
        Probar sin cuenta
      </NavLink>
      : null
  )
}

export default BtnNotRegistered