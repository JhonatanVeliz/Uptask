import { useSelector } from "react-redux";
import { useState } from "react";

// COMPONENTS
import EditUserView from "../components/EditUserView";
import EditUserData from "../components/EditUserData";
import Modal from "../components/Modal";

// UTILITIES
import { disassemblyTime } from "../utilities";
import { updateUser } from "../data/login";

const EditUser = () => {

  const { name, password, avatar } = useSelector(({ user }) => user.userData);
  const { token } = useSelector( ({ login }) => login );

  const [user, setUser] = useState({ name, password, avatar, avatar_view : '' });
  const [isThereError, setIsThereError] = useState(false);

  const changeDataUser = (value, name) => {
    setUser({ ...user, [name]: value })
  }

  const handleSave = async () => {

    if (password === user.password && name === user.name && user.avatar_view === avatar) {
      setIsThereError(true);
      setTimeout( () => setIsThereError(false), disassemblyTime );
      return
    }

    try {
      const userData = { name : user.name, password : user.password, avatar : user.avatar };
      const updatedUser = await updateUser( import.meta.env.VITE_API_URL + 'sign_up', userData, token);
      console.log(updatedUser);
      console.log('correcto');
    } 
    catch (error) { console.log(error); }
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
        changeDataUser={ changeDataUser }
        handleSave={handleSave}
        user={user}
      />

      <EditUserView
        name={user.name}
        avatar={user.avatar}
        avatar_view={user.avatar_view}
        password={user.password}
        changeDataUser={ changeDataUser }
        handleSave={ handleSave }
      />

    </div>
  )
}

export default EditUser