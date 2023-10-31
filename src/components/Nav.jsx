import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/login/loginSlice";

const Nav = () => {

  const user = useSelector(state => state.login.user);
  const dispatch = useDispatch();

  const loginRoot = () => {
    dispatch(login('root'));
  }

  return (
    <nav className="nav">

      <NavLink to={'/dashboard'}>
        <h1 className='nav__icon'>UpConst</h1>
      </NavLink>

      <div>

        {
          !user
            ? <NavLink
              to={'/dashboard'}
              className="nav__user-root"
              onClick={loginRoot}
            >
              Probar sin cuenta
            </NavLink>
            : null

      }

      </div>

    </nav>
  )
}

export default Nav