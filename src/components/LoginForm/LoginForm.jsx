import React, { useState } from 'react';
import './LoginForm.css';
import { FaEye } from 'react-icons/fa';

function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="LoginForm">
      <form>
        <label htmlFor="email">
          Email:
          <input type="text" id="email" />
        </label>
        <div className="passwordWrapper">
          <label htmlFor="password">
            Password:
            <input type={passwordShown ? 'text' : 'password'} id="password" />
          </label>
          <FaEye onClick={togglePasswordVisibility} />
        </div>
        <a href="/">Forgot password </a>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default LoginForm;
