const FormInputs = ({ title = "", type = "text"}) => {
  return (
    <div className="login__form__content-inputs">

      <label 
        htmlFor={title} 
        className="login__form__label"
      >
        {title}
      </label>

      <input 
        type={type} 
        id={title} 
        placeholder={`escribe tu ${title}:`}
        className="login__form__input"
      />
      
    </div>
  )
}

export default FormInputs