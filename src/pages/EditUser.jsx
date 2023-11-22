import { useState } from "react"

import EditUserView from "../components/EditUserView"
import EditUserData from "../components/EditUserData";

const EditUser = () => {

  const { password } = JSON.parse(localStorage.getItem('userData'));
  const userName = localStorage.getItem('userName');

  const [ user, setUser ] = useState({ name : userName, password, img : '' });

  const changeDataUser = ( value, name ) => {
    setUser({ ...user, [name] : value })
  }

  const handleSave = () => {
    console.log(user);
  }

  return (
    <div className="editUser">

      <EditUserData  
        changeDataUser={ changeDataUser } 
        user={user}
      />

      <EditUserView  
        name={ user.name } 
        img={ user.img }
        password={ user.password } 
        handleSave={handleSave} 
      />

    </div>
  )
}

export default EditUser