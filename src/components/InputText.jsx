const InputText = ({ title = '', changeData = '', name = '', value = '' }) => {

  const writingData = (e) => {
    const { value, name } = e.target;
    changeData(value, name);
  };

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
        placeholder={`Escribe tu ${title}:`}
        className="login__form__input"
        onChange={writingData}
        name={name}
        value={value}
      />

    </>
  )
}

export default InputText