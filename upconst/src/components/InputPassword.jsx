import React from 'react'

const InputPassword = ({title = ''}) => {
  return (
    <>

      <label
        htmlFor={title}
        className="login__form__label"
      >
        {title}
      </label>

      <input
        type="text"
        id={title}
        placeholder={`escribe tu ${title}:`}
        className="login__form__input"
      />

    </>
  )
}

export default InputPassword