import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux";

// HELPERS
import { verifyData } from "../helpers";
import { createUser } from "../data/login";

// Components
import Nav from "../components/Nav";
import BtnNotLogin from "../components/BtnNotLogin";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import InputFileImg from "../components/inputFileImg";
import MessageError from "../components/MessageError";
import { login as loginSlice } from "../features/login/loginSlice";
// import useFetchLogin from "../hooks/useFetchLogin";

const Login = () => {

  const navigate = useNavigate();

  const initialState = { name: '', password: '', email: '' }
  const [data, setData] = useState(initialState);
  const [invalidText, setInvalidText] = useState({ invalid: false, text: '' });

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const verifiedData = verifyData(data);

    if (verifiedData.invalid) {

      setTimeout(() => {
        setInvalidText({ invalid: false, text: '' });
      }, 6000);

      return setInvalidText(verifiedData);
    }

    try {
      const createdUser = await createUser('https://upconstthebackendykm.onrender.com/sign_up', data);
      console.log(createdUser, 'usuario creado');
    }
    catch (error) {
      setInvalidText({ invalid: true, text: `El usuario ${data.name} no se pudo crear porfavor intentalo de nuevo cambiando algunos datos.` });
      return;
    }

    dispatch(loginSlice(data));
    localStorage.setItem('user', JSON.stringify(data.name));
    setData(initialState)
    navigate('/dashboard');
  }

  return (
    <>
      <Nav>
        <BtnNotLogin />
      </Nav>

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