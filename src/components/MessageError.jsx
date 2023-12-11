import React from 'react'

const MessageError = React.memo(({ invalid = false, text = '', isLight = false }) => {

  return (
    <legend
      className={
        `login__form__invalid-text 
        login__form__invalid-text${ invalid ? '--active' : ''}
        login__form__invalid-text--active${ isLight ? '__light' : ''}
      `}
    >
      { text }
    </legend>
  )
}
)
export default MessageError;