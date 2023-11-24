import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// HELPERS
import { verifyDataSignup } from "../helpers";
import { removeMessageError } from "../utilities";
import { createUser } from "../data/login";

// Components
import Nav from "../components/Nav";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import InputFileImg from "../components/inputFileImg";
import MessageError from "../components/MessageError";

const Login = () => {

  const navigate = useNavigate();

  const initialState = { name: '', password: '', password2 : '', email: '' }
  const [data, setData] = useState(initialState);
  const [invalidText, setInvalidText] = useState({ invalid: false, text: '' });

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifiedData = verifyDataSignup(data);

    if (verifiedData.invalid) {
      setTimeout(() => setInvalidText({ invalid: false, text: '' }), removeMessageError);
      setInvalidText(verifiedData);
      return;
    }

    try {
      const newData = { name : data.name, password : data.password, email : data.email };
      const createdUser = await createUser( import.meta.env.VITE_API_URL + 'sign_up', newData);
    }
    catch (error) {
      setInvalidText({ invalid: true, text: `El usuario ${data.name} no se pudo crear porfavor intentalo de nuevo cambiando algunos datos.` });
      return;
    }

    navigate('/login');
  }

  return (
    <>
      <Nav/>

      <section className='login'>

        <div className="login__layout">

          <h2 className='login__title'>Crea Una Cuenta</h2>

          <form className="login__form" onSubmit={handleSubmit}>

            <MessageError invalid={invalidText.invalid} text={invalidText.text} />

            <div className="login__form__content-inputs">

              <InputText
                title="correo"
                changeData={changeData}
                name="email"
                value={data.email}
              />

              <InputText
                title="nombre"
                changeData={changeData}
                name="name"
                value={data.name}
              />

              <InputPassword
                title="contraseña"
                changeData={changeData}
                value={data.password}
                name="password"
              />

              <InputPassword
                title="repetir contraseña"
                changeData={changeData}
                value={data.password2}
                name="password2"
              />

            </div>

            <div className="login__form__buttons">

              {/* <InputFileImg 
                fileValue={ data.file } 
                changeData={ changeData }
              /> */}

              <button type="submit" className="login__form__btn-login">Crear</button>

            </div>

          </form>

          <NavLink to={'/login'} className="login__remember-password">
            Ya Tengo Una Cuenta
          </NavLink>

        </div>

      </section>

    </>
  )
}

export default Login