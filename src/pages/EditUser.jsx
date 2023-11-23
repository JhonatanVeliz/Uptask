import { useSelector } from "react-redux";
import { useState } from "react";

// COMPONENTS
import EditUserView from "../components/EditUserView";
import EditUserData from "../components/EditUserData";
import Modal from "../components/Modal";

// UTILITIES
import { disassemblyTime } from "../utilities";

const EditUser = () => {

  const { name, password } = useSelector(({ user }) => user.userData);

  const [user, setUser] = useState({ name, password, img: '' });
  const [isThereError, setIsThereError] = useState(false);

  const changeDataUser = (value, name) => {
    setUser({ ...user, [name]: value })
  }

  const handleSave = () => {
    if (password === user.password && name === user.name && user.img == '') {
      setIsThereError(true);
      setTimeout( () => setIsThereError(false), disassemblyTime );
    }
  }

  return (
    <div className="editUser">

      {
        isThereError &&
        <Modal
          title="Advertencia"
          text="Tus valores son iguales porfavor cambialos y vuelve a intentar"
          initialState={isThereError}
        />
      }

      <EditUserData
        changeDataUser={changeDataUser}
        user={user}
      />

      <EditUserView
        name={user.name}
        img={user.img}
        password={user.password}
        handleSave={handleSave}
      />

    </div>
  )
}

export default EditUser