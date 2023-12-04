import React from 'react'

const TextTarea = ({ htmlId, name, changeNote, value }) => {

  const handleWrite = (e) => {
    const { name, value } = e.target;
    changeNote( name, value )
  }

  return (
    <>
      <label htmlFor={ htmlId } className="viewTask__commits__create__title">Avance Diario</label>

      <textarea
        name={ name }
        id={ htmlId }
        className="viewTask__commits__create__textarea"
        placeholder="Avance del dia de hoy:"
        value={value}
        onChange={handleWrite}
      >
      </textarea>
    </>
  )
}

export default TextTarea