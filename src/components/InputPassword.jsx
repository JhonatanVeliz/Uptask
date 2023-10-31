import { useState } from "react";

import seePasword from "../assets/icons/password.png";
import closePassword from "../assets/icons/no-password.png";

const InputPassword = ({ title = '', changeData = '', value = '' }) => {

  const initialState = { type: 'password', img : seePasword };
  const secondState = { type: 'text', img : closePassword };

  const [ stateInput, setStateInput ] = useState(initialState);

  const changeInput = () => {
    if(stateInput.type === 'password'){
      setStateInput(secondState);
    }else { setStateInput(initialState); }
  }

  const writingData = (e) => {
    const { value, name } = e.target;
    changeData(value, name)
  }

  return (
    <>

      <label
        htmlFor={title}
        className="login__form__label"
      >
        {title}
      </label>


      <div className="login__form__input__box">

        <input
          type={stateInput.type}
          id={title}
          placeholder={`Escribe tu ${title}:`}
          className="login__form__input login__form__input--password"
          onChange={writingData}
          name="password"
        />

        <img 
          src={stateInput.img} 
          alt="ver contraseña" 
          className="login__form__input__box__img"
          onClick={changeInput}
        />

      </div>

    </>
  )
}

export default InputPassword