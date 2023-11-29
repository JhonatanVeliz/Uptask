import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changeUserState } from "../features/user/userSlice";

// COMPONENTS
import EditUserData from "../components/EditUserData";
import EditUserPassword from "../components/EditUserPassword";
import EditUserNav from "../components/EditUserNav";
import AuthorizationRoute from "../components/protectedRoutes/AuthorizationRoute";
import Modal from "../components/Modal";

// UTILITIES
import { disassemblyTime } from "../utilities";
import { updateUser } from "../data/login";

const EditUser = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, password, email, avatar, id, isRegistered } = useSelector(({ user }) => user.userData);
  const { token } = useSelector(({ login }) => login);

  const [user, setUser] = useState({ name, password: '', email, avatar, avatar_view: '' });
  const [avatarView, setAvatarView] = useState(avatar);
  const [isThereError, setIsThereError] = useState(false);
  const [isEditUser, setIsEditUser] = useState(true);

  const changeDataUser = (value, name) => {
    setUser({ ...user, [name]: value });
  }

  const changeDataAvatarView = (value) => {
    setAvatarView(value);
  };

  const changeIsEditUser = ( booleanValue ) => {
    setIsEditUser(booleanValue);
  }

  const handleSave = async (e) => {

    e.preventDefault();

    if (password === user.password && name === user.name && avatarView === avatar && email === user.email) {
      setIsThereError(true);
      setTimeout(() => setIsThereError(false), disassemblyTime);
      return
    }

    try {
      const userData = { name: user.name, password: user.password, email: user.email, avatar: user.avatar };
      const updatedUser = await updateUser(import.meta.env.VITE_API_URL + 'sign_up', userData, token);
      dispatch(changeUserState({ ...userData, avatar: avatarView, id, isRegistered }));
    }
    catch (error) { console.log(error); }
    navigate('/dashboard');
  }

  return (
    <>

      <AuthorizationRoute />

      <form className="editUser" onSubmit={handleSave} encType="multipart/form-data">

        {
          isThereError &&
          <Modal
            title="Advertencia"
            text="Tus valores son iguales porfavor cambialos y vuelve a intentar"
            initialState={isThereError}
          />
        }

        <EditUserNav changeIsEditUser={changeIsEditUser} />

        {
          isEditUser
            ?
            <EditUserData
              changeDataUser={changeDataUser}
              user={user}
              avatar_view={avatarView}
              changeDataAvatarView={changeDataAvatarView}
            />
            : <EditUserPassword />
      }


      </form>
    </>
  )
}

export default EditUser