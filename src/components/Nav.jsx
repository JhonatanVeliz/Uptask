// REACT UTILITIES
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import BtnLogout from "./BtnLogout";
import BtnNotRegistered from "./BtnNotRegistered";

const Nav = () => {

  const userToken = useSelector( state => state.login.token );

  return (
    <nav className="nav">

      <NavLink to="/dashboard">
        <h1 className='nav__icon'>UpConst</h1>
      </NavLink>

      {
        userToken
        ? <BtnLogout />
        : <BtnNotRegistered />
      }

    </nav>
  )
}

export default Nav