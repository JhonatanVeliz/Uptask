import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">

      <NavLink to={'/'}>
        <h1 className='nav__icon'>UpConst</h1>
      </NavLink>

      <div>

        <button className="nav__user-root">
          Probar sin cuenta
        </button>

      </div>

    </nav>
  )
}

export default Nav