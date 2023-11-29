import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Modal from "./Modal";
import BtnsSubmit from "./BtnsSubmit";

// Utilities 
import { disassemblyTime } from "../utilities";
// STATE
import { updateUserData } from "../data/login";
import { changeUserState } from "../features/user/userSlice";

import InputText from "./InputText";
import InputImg from "./InputImg";

const EditUserData = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { name, password, email, avatar, id, isRegistered } = useSelector(({ user }) => user.userData);
  const {token} = useSelector( ({ login }) => login );

  const [user, setUser] = useState({ name, password: '', email, avatar : '' });
  const [avatarView, setAvatarView] = useState(avatar);
  const [isThereError, setIsThereError] = useState(false);

  const changeDataUser = (value, name) => {
    setUser({ ...user, [name]: value });
  }

  const changeDataAvatarView = (value) => {
    setAvatarView(value);
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];
    const urlFile = URL.createObjectURL(file);

    if (!file.type.includes('image')) return;

    const reader = new FileReader(); // Crear un lector de archivos
    // Cuando el archivo se carga correctamente, obtener la URL y establecerla en el estado
    reader.onloadend = () => {
      changeDataUser(file, 'avatar');
    }
    reader.readAsDataURL(file); // Convertir el archivo a una URL base64
    changeDataAvatarView(urlFile);
  }

  const handleSave = async (e) => {
    e.preventDefault();

    if (name === user.name && avatar === avatarView && email === user.email) {
      setIsThereError(true);
      setTimeout(() => setIsThereError(false), disassemblyTime);
      return
    }

    if (user.password == '') return;

    if (user.password !== password) {
      console.log('password diferente');
      return;
    }

    try {
      const userData = { name: user.name, password, email: user.email, avatar: user.avatar };
      const updatedUser = await updateUserData(import.meta.env.VITE_API_URL + 'sign_up', userData, token);
      dispatch(changeUserState({ ...userData, avatar: avatarView, id, isRegistered }));
    }
    catch (error) { console.log(error); }
    navigate('/dashboard');
  }

  return (
    <form className="editUser__data" onSubmit={handleSave} encType="multipart/form-data">

      {
        isThereError &&
        <Modal
          title="Advertencia"
          text="Tus valores son iguales porfavor cambialos y vuelve a intentar"
          initialState={isThereError}
        />
      }

      <legend className="editUser__data__title">Datos a Editar</legend>

      <div className="editUser__data__perfil">

        <InputImg
          id='perfil'
          handleFileChange={handleFileChange}
          avatar_view={avatarView}
        />

        <label htmlFor="perfil" className="editUser__data__perfil__btn">
          Ingresar Imagen
        </label>

      </div>

      <InputText
        title="email"
        name="email"
        changeData={changeDataUser}
        value={user.email}
      />

      <InputText
        title="nombre"
        name="name"
        changeData={changeDataUser}
        value={user.name}
      />

      <InputText
        title="Contraseña Actual de Confirmación"
        name="password"
        changeData={changeDataUser}
        value={user.password}
      />

      <BtnsSubmit />

    </form>
  )
}

export default EditUserData