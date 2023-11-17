import { useState } from "react";

const InputPassword = ({ title = '', changeData = '', value = '' }) => {

  const initialState = { type: 'password', img : "/img/icons/password.png" };
  const secondState = { type: 'text', img : "/img/icons/no-password.png" };

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
          value={value}
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