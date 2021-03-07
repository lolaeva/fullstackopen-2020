import React from 'react'

const LoginForm = ({ handleSubmit, handleUserNameChange, handlePasswordChange, username, password}) => {
  
  return (
    <div >
      <h3>Login to application</h3>
      <form onSubmit={handleSubmit}>
        <div className='loginform__input'>
          <span >username</span>
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUserNameChange}
          />
        </div>
        <div className='loginform__input'>
          <span>password</span>
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm