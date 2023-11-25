import React from 'react'

const MessageError = React.memo(({ invalid = false, text = '' }) => {

  return (
    <legend
      className={`login__form__invalid-text ${ invalid ? 'login__form__invalid-text--active' : ''}`}
    >
      { text }
    </legend>
  )
}
)
export default MessageError;