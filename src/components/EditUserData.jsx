import InputText from "./InputText";

const EditUserData = ({ changeDataUser = () => {}, user = {} }) => {

  const { name, password, email } = user;

  return (
    <div className="editUser__data">

        <legend className="editUser__data__title">Datos a Editar</legend>

        <InputText
          title="nombre"
          name="name"
          changeData={changeDataUser}
          value={ name }
        />

        <InputText
          title="email"
          name="email"
          changeData={changeDataUser}
          value={ email }
        />

        <InputText
          title="contraseña"
          name="password"
          changeData={changeDataUser}
          value={ password }
        />

    </div>
  )
}

export default EditUserData