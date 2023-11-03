import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux";

// Components
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import MessageError from "../components/MessageError";
import { login as loginSlice } from "../features/login/loginSlice";
import useFetchLogin from "../hooks/useFetchLogin";

const Login = () => {

  const navigate = useNavigate();

  const user = useSelector( state => state.login.user );

  const [data, setData] = useState({ user: '', password: '' });
  const [invalidText, setInvalidText] = useState({ invalid: false, text: '' });

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout( () => {
      setInvalidText({ invalid: false, text: '' });
    }, 5000);

    const { user, password } = data;
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if ([user, password].includes('') || Object.values(data).length < 1) {
      setInvalidText({ invalid: true, text: 'Campos vacíos' });
      return;
    }

    if(!user.match(regexEmail)){
      setInvalidText({ invalid : true, text : '¡ ERROR ! porfavor verifica tu correo' });
      return
    }

    if(!password.match(/\d/)){
      setInvalidText({ invalid : true, text : 'Tu contraseña debe incluir al menos un número' });
      return;
    }

    if(password.match(/\s/)){
      setInvalidText({ invalid : true, text : 'Tu contraseña no debe incluir espacios vacios' });
      return;
    }

    try {
      const { dataLogin } = useFetchLogin(`https://www.google.com/`);
      console.log(dataLogin);
    } catch (error) {
      setInvalidText({ invalid : true, text : `El usuario ${ data.user } no existe` });
    }

    // dispatch(login(data));

  }

  useEffect( () => {

    if(user){
      navigate('/dashboard');
    }

  }, [])

  return (
    <div className='login'>

      <div className="login__layout">

        <h2 className='login__title'>Iniciar Sesión</h2>

        <form className="login__form" onSubmit={handleSubmit}>

          <MessageError invalid={ invalidText.invalid } text={ invalidText.text } />

          <div className="login__form__content-inputs">

            <InputText 
              title="correo" 
              changeData={changeData} 
              name="user"
              value={data.user}
            />

            <InputPassword 
              title="contraseña" 
              changeData={changeData}
              value={data.password}
            />

          </div>

          <div className="login__form__buttons">
            <button type="button" className="login__form__btn-not-account">Crea una cuenta</button>
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