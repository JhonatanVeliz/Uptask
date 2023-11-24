import { NavLink } from "react-router-dom";

const CardsDashboard = ({ routeTo = '/dashboard', name = '', description = '', id = '' }) => {

  return (
    <NavLink to={routeTo} className="dashboard__container__card">

      <h3>{ name }</h3>
      <p>{ description }</p>

    </NavLink>
  )
}

export default CardsDashboard