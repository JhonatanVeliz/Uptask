import { Link } from "react-router-dom";

import InputText from "./InputText";
import InputImg from "./InputImg";

const EditUserData = ({ changeDataUser = () => {}, user = {}, avatar_view = '', changeDataAvatarView = () => {} }) => {

  const { name, password, email } = user;

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

  return (
    <div className="editUser__data">

        <legend className="editUser__data__title">Datos a Editar</legend>

        <div className="editUser__data__perfil">

          <InputImg 
            id='perfil'
            handleFileChange={ handleFileChange } 
            avatar_view={ avatar_view }
          />

          <label htmlFor="perfil" className="editUser__data__perfil__btn">
            Ingresar Imagen
          </label>

        </div>

        <InputText
          title="email"
          name="email"
          changeData={changeDataUser}
          value={ email }
        />
        
        <InputText
          title="nombre"
          name="name"
          changeData={changeDataUser}
          value={ name }
        />

        <InputText
          title="contraseña Actual"
          name="password"
          changeData={changeDataUser}
          value={ password }
        />

        <div className="editUser__data__btns">

          <Link to="/dashboard" className="editUser__data__btns__red">
            Cancelar
          </Link>

          <button type="submit" className="editUser__data__btns__blue">Guardar</button>
          
        </div>

    </div>
  )
}

export default EditUserData