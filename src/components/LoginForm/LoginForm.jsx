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
  const [rememberMe, setRememberMe] = useState(false);
  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // tabs above login form, sets user to admin/teacher and adjusts background color
  const [loginColor, setLoginColor] = useState('#1A4767');
  const [loginButtonColor, setLoginButtonColor] = useState('#BBCBE2');
  const [loginButtonFontColor, setLoginButtonFontColor] = useState('#212529');
  const setUserAdmin = () => {
    setLoginColor('#1A4767');
    setLoginButtonColor('#BBCBE2');
    setLoginButtonFontColor('#212529');
  };
  const setUserTeacher = () => {
    setLoginColor('#6A91BC');
    setLoginButtonColor('#003459');
    setLoginButtonFontColor('#FFFFFF');
  };

  return (
    <div className="loginFormWrapper">
      {/* Admin/Teacher tabs, above form */}
      <div className="userTabs">
        <button id="adminButton" type="button" onClick={setUserAdmin}>
          Admin
        </button>
        <button id="teacherButton" type="button" onClick={setUserTeacher}>
          Teacher
        </button>
      </div>

      {/* body of LoginForm */}
      <div className="formWrapper" style={{ backgroundColor: loginColor }}>
        <h1 className="title"> Log In </h1>

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

          <input
            id="submitButton"
            type="submit"
            value="Login"
            style={{ backgroundColor: loginButtonColor, color: loginButtonFontColor }}
          />
        </form>

        <div className="links">
          <a id="forgotPassword" href="login/reset-password">
            Forgot password?
          </a>
          <a id="noAccount" href="/">
            Don&apos;t have an account?
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
