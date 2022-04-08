import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { instanceOf } from 'prop-types';
import styles from './LoginForm.module.css';
import { Cookies, withCookies } from '../../common/auth/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../common/auth/auth_utils';

const LoginForm = ({ cookies }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();

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

  /**
   * This function handles logging in with email/password (standard log in)
   * If the user signs in successfully, they are redirected to /logout, otherwise they are redirected to the login screen
   * @param {Event} e
   */
  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await logInWithEmailAndPassword(email, password, '/settings', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
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
    <div className={styles.loginFormWrapper}>
      {/* Admin/Teacher tabs, above form */}
      <div className={styles.userTabs}>
        <button id={styles.adminButton} type="button" onClick={setUserAdmin}>
          Admin
        </button>
        <button id={styles.teacherButton} type="button" onClick={setUserTeacher}>
          Teacher
        </button>
      </div>

      {/* body of LoginForm */}
      <div className={styles.formWrapper} style={{ backgroundColor: loginColor }}>
        <h1 className={styles.title}> Log In </h1>

        <form>
          <div className={styles.emailInput}>
            <label className={styles.logLabel} htmlFor="email">
              Email
              <br />
              <input
                type="text"
                id={styles.email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email Address"
                required
              />
            </label>
          </div>

          <div className={styles.passwordInput}>
            <label className={styles.logLabel} htmlFor="password">
              Password
              <br />
              <input
                type={passwordShown ? 'text' : 'password'}
                onChange={({ target }) => setPassword(target.value)}
                id={styles.password}
                placeholder="Password"
                required
              />
              <FaEye id={styles.eyeIcon} color="black" onClick={togglePasswordVisibility} />
            </label>
          </div>

          <div className={styles.rememberMeBox}>
            <label htmlFor="rememberBox">
              <input
                type="checkbox"
                id={styles.rememberBox}
                checked={rememberMe}
                onChange={toggleRememberMe}
              />
              Remember Me?
            </label>
          </div>

          {errorMessage && <p>{errorMessage}</p>}

          <input
            id={styles.submitButton}
            type="submit"
            value="Login"
            style={{ backgroundColor: loginButtonColor, color: loginButtonFontColor }}
            onClick={handleSubmit}
          />
        </form>

        <div className={styles.links}>
          <a id={styles.forgotPassword} href="login/reset-password">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LoginForm);
