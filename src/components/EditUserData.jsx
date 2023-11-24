import InputText from "./InputText";

const EditUserData = ({ changeDataUser = () => {}, user = {} }) => {

  const { name, password } = user;

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

    </form>
  )
}

export default EditUserData