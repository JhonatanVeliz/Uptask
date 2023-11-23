
const InputImg = ({ title = '', id = '', handleFileChange = () => {}}) => {
  return (
    <>
      <label htmlFor={ id } className="editUser__data__img__label">
          { title }
      </label>

      <input
        className="editUser__data__img"
        type="file" 
        id={ id } 
        onChange={handleFileChange}
      />
    </>
  )
}

export default InputImg