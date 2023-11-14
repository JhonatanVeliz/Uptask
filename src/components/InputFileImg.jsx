import { useRef } from "react"

const InputFileImg = ({ fileValue = '', changeData = () => {} }) => {

  const imgUser = useRef(null);

  const getImg = (event) => {

    const userImg = event.target.files[0] || null;

    if(!userImg.type.includes('image')) {
      alert('El archivo no es valido');
      return;
    };

    const imgData = new FormData();
    imgData.append('imagen', userImg);

    changeData( imgData, 'file' );

  }

  return (
    <>
      <label
        htmlFor="login-file"
        className="login__form__btn-red login__form__btn-red--no-margin">
        Subir Imagen
      </label>

      <input
        id="login-file"
        ref={imgUser}
        type="file"
        className="login__form__buttons__file"
        value={fileValue}
        onChange={getImg}
      />
    </>
  )
}

export default InputFileImg