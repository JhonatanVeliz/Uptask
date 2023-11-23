import InputText from "./InputText";

import InputImg from "./InputImg";

const EditUserData = ({ changeDataUser = () => {}, user = {} }) => {

  const { name, password } = user;

  const handleFileChange = ( e ) => {

    const file = e.target.files[0];

    if(!file.type.includes('image')) return;

      const reader = new FileReader(); // Crear un lector de archivos
      // Cuando el archivo se carga correctamente, obtener la URL y establecerla en el estado
      reader.onloadend = () => changeDataUser(reader.result, 'img');
      reader.readAsDataURL(file); // Convertir el archivo a una URL base64
  }

  return (
    <form className="editUser__data">

        <legend className="editUser__data__title">Datos a Editar</legend>

        <InputText
          title="nombre"
          name="name"
          changeData={changeDataUser}
          value={ name }
        />

        <InputText
          title="contraseña"
          name="password"
          changeData={changeDataUser}
          value={ password }
        />

        <InputImg 
          handleFileChange={ handleFileChange }
          title="Ingresar una imagen"
          id="editUser-img"
        />

    </form>
  )
}

export default EditUserData