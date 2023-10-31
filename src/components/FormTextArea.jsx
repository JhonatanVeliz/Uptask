import React from 'react'

const FormTextArea = ({ title = '', name = '', changeData = '', value = '' }) => {

  const writingData = (e) => {
    const { value, name } = e.target;
    changeData(value, name)
  }

  return (
    <div className=''>

      <label 
        htmlFor={name}
        className='new-project__form__label'
      >
        { title }:
      </label>

      <textarea 
        name={name} 
        id={name}
        placeholder={`Escribe Aquí la ${title}:`}
        className='new-project__form__text-area'
        onChange={ writingData }
        value={ value }
      >
      </textarea>

    </div>
  )
}

export default FormTextArea