import React, { useState } from 'react';
import './LoginForm.css';
import { FaEye } from 'react-icons/fa';

function LoginForm() {
  // eye icon in password input, toggles hiding password
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  // checkbox under inputs, toggles remembering user
  const [rememberMe, setRememberMe] = React.useState(false);
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="loginFormWrapper">
      <h1> Log In </h1>

      <form>
        <div className="emailInput">
          <label htmlFor="email">
            Email
            <br />
            <input type="text" id="email" placeholder="Email Address" />
          </label>
        </div>

        <div className="passwordInput">
          <label htmlFor="password">
            Password
            <br />
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              placeholder="Password"
            />
            <FaEye id="eyeIcon" color="black" onClick={togglePasswordVisibility} />
          </label>
        </div>

        <div className="rememberMeBox">
          <label htmlFor="rememberBox">
            <input
              type="checkbox"
              id="rememberBox"
              checked={rememberMe}
              onChange={toggleRememberMe}
            />
            Remember Me?
          </label>
        </div>

        <input id="submitButton" type="submit" value="Login" />
      </form>

      <div className="links">
        <a id="forgotPassword" href="/">
          Forgot password?
        </a>
        <a id="noAccount" href="/">
          Don&apos;t have an account?
        </a>
      </div>
    </div>
  );
}

export default LoginForm;
