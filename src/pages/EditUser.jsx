import { useState } from "react";

// COMPONENTS
import EditUserData from "../components/EditUserData";
import EditUserPassword from "../components/EditUserPassword";
import EditUserNav from "../components/EditUserNav";

const EditUser = () => {

  const [isEditUser, setIsEditUser] = useState(true);

  const changeIsEditUser = (booleanValue) => {
    setIsEditUser(booleanValue);
  }

  return (

    <section className="editUser">

      <EditUserNav changeIsEditUser={changeIsEditUser} />

      {
        isEditUser
          ? <EditUserData />
          : <EditUserPassword />
      }

    </section>
  )
}

export default EditUser