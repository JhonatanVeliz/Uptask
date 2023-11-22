// REACT UTILITIES
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// components
import NavSettings from "./NavSettings";
import BtnNotRegistered from "./BtnNotRegistered";

const Nav = () => {

  const { token } = useSelector( ({ login }) => login );

  return (
    <nav className="nav">

      <NavLink to="/dashboard">
        <h1 className='nav__icon'>UpConst</h1>
      </NavLink>

      {
        token
        ? <NavSettings />
        : <BtnNotRegistered />
      }

    </nav>
  )
}

export default Nav