import { Link } from "react-router-dom"

const BtnsSubmit = () => {
  return (
    <div className="editUser__data__btns">

      <Link to="/dashboard" className="editUser__data__btns__red">
        Cancelar
      </Link>

      <button type="submit" className="editUser__data__btns__blue">Guardar</button>

    </div>
  )
}

export default BtnsSubmit