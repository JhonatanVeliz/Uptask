import { NavLink } from "react-router-dom";

const CardsDashboard = ({ routeTo = '/dashboard', title = '', description = '', id = '' }) => {

  return (
    <NavLink to={routeTo} className="dashboard__container__card">

      <h3>{ title }</h3>
      <p>{ description }</p>

    </NavLink>
  )
}

export default CardsDashboard