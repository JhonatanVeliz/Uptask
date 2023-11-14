import { NavLink } from "react-router-dom";

const Nav = ({ children = null }) => {

  return (
    <nav className="nav">

      <NavLink to={'/dashboard'}>
        <h1 className='nav__icon'>UpConst</h1>
      </NavLink>

      <div>{children}</div>

    </nav>
  )
}

export default Nav