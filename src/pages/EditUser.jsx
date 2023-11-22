import { useState } from "react"

import EditUserView from "../components/EditUserView"
import EditUserData from "../components/EditUserData";

const EditUser = () => {

  const { password } = JSON.parse(localStorage.getItem('userData'));
  const userName = localStorage.getItem('userName');

  const [ user, setUser ] = useState({ name : userName, password });

  const changeDataUser = ( value, name ) => {
    setUser({ ...user, [name] : value })
  }

  console.log('se renderizo');

  return (
    <div className="editUser">

      <EditUserData  changeDataUser={ changeDataUser } user={user}/>

      <EditUserView  name={ user.name } password={ user.password } />

    </div>
  )
}

export default EditUser