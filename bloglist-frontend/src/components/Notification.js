import React from 'react'

const messageType = (message, errorMessage) => {
  const result = (message && message.length > 0) ?
    <section className='notification'>
      {message}
    </section>
    :
    <section className='errorNotification'>
      {errorMessage}
    </section>
  return result
}

const Notification = ({ message, errorMessage }) => {
  return (
    messageType(message, errorMessage)
  )
}

export default Notification