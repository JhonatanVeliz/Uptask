import { NavLink } from "react-router-dom";

// Components
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";

const Login = () => {

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target);
  }

  return (
    <div className='login'>

      <div className="login__layout">

        <h2 className='login__title'>Iniciar Sesión</h2>

        <form className="login__form" onSubmit={handleSubmit}>

          <div className="login__form__content-inputs">
            <InputText title="correo" />
            <InputPassword title="contraseña" />
          </div>

          <div className="login__form__buttons">
            <button type="submit" className="login__form__btn-not-account">No tengo cuenta</button>
            <button type="submit" className="login__form__btn-login">Ingesar</button>
          </div>

        </form>

        <NavLink to={'/'} className="login__remember-password">
          Olvide mi contraseña
        </NavLink>

      </div>

    </div>
  )
}

export default Login