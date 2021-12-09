import React, { useState } from 'react';
import './LoginForm.css';
import { FaEye } from 'react-icons/fa';

function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="loginFormWrapper">
      <div className="loginForm">
        <h1> Log In </h1>
        <form>
          <input type="text" id="email" placeholder="Email Address" />
          <div className="passwordWrapper">
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              placeholder="Password"
            />
            <FaEye id="eyeIcon" color="black" onClick={togglePasswordVisibility} />
          </div>
          <input id="submitButton" type="submit" value="Login" />
          <br />
          <a id="forgotPassword" href="/">
            Forgot password
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
