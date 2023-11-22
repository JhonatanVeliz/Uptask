import InputText from "./InputText";
import imgPerfil from '../../public/img/profiles/user-perfil.svg';

const EditUserData = ({ changeDataUser = () => {}, user = {} }) => {

  const { name, password } = user;

  const handleFileChange = ( e ) => {

    const file = e.target.files[0];

    if(!file.type.includes('image')) return;

    if (file) {
      const reader = new FileReader(); // Crear un lector de archivos

      reader.onloadend = () => {
        // Cuando el archivo se carga correctamente, obtener la URL y establecerla en el estado
        changeDataUser(reader.result, 'img');
      };

      reader.readAsDataURL(file); // Convertir el archivo a una URL base64
    }
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

        <input type="file" onChange={handleFileChange}/>

    </form>
  )
}

export default EditUserData