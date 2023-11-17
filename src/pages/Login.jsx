import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// REDUX TOOLKIT
import { useDispatch, useSelector } from "react-redux";

// Components
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import InputText from "../components/InputText";
import InputPassword from "../components/InputPassword";
import MessageError from "../components/MessageError";

// REDUCERS SLICE DIFFERENT STATES
import { login as loginSlice } from "../features/login/loginSlice";
import { modifyState } from "../features/firstVisit/firstVistiSlice";

// HELPERS
import { userLogin } from "../data/login";
import { verifyData } from "../helpers";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firtsVisitState = useSelector( state => state.firstVisit.value );

  const initialState = { password: '', email: '' }
  const [data, setData] = useState(initialState);
  const [invalidText, setInvalidText] = useState({ invalid: false, text: '' });
  const [ isLoading, setIsLoading ] = useState(false);

  const changeData = (value, name) => {
    setData({ ...data, [name]: value });
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    const verifiedData = verifyData(data);

    if (verifiedData.invalid) {

      setTimeout(() => {
        setInvalidText({ invalid: false, text: '' });
      }, 6000);

      setInvalidText(verifiedData);
      return;
    }

    fetchUser(data)
  }

  const fetchUser = async (userData) => {

    setIsLoading(true);

    try {
      const token = await userLogin(`https://upconstthebackendykm.onrender.com/login`, userData);
      dispatch(loginSlice(token));
    }
    catch (error) {
      setInvalidText({ invalid: true, text: `Usuario no encontrado porfavor Verifica tus datos y vuelve a intentar` });
      setIsLoading(false);
      console.log(error);
      return;
    }

    navigate('/dashboard');
  }

  useEffect(() => {

    // funcion para que otro usuario pueda usar el mismo dispositivo pero con una cuenta diferente
    if(!firtsVisitState) return;
    

    // hace la llamada para iniciar sesion de inmediato si el usuario ya ingreso con anterioridad
    const userData = JSON.parse(localStorage.getItem('userData')) || null;
    if (userData){
      fetchUser(userData);
    }
    dispatch(modifyState(false));

  }, [])

  return (
    <> 

      {
        isLoading 
        ? <Loader />
        : null
      }

      <Nav />

      <section className='login'>

        <div className="login__layout">

          <h2 className='login__title'>Iniciar Sesión</h2>

          <form className="login__form" onSubmit={handleSubmit}>

            <MessageError invalid={invalidText.invalid} text={invalidText.text} />

            <div className="login__form__content-inputs">

              <InputText
                title="correo"
                changeData={changeData}
                name="email"
                value={data.email}
              />

              <InputPassword
                title="contraseña"
                changeData={changeData}
                value={data.password}
              />

            </div>

            <div className="login__form__buttons">
              <NavLink to="/signup" className="login__form__btn-red">Crea una cuenta</NavLink>
              <button type="submit" className="login__form__btn-login">Ingesar</button>
            </div>

          </form>

          <NavLink to={'/'} className="login__remember-password">
            Olvide mi contraseña
          </NavLink>

        </div>

      </section>

    </>
  )
}

export default Login