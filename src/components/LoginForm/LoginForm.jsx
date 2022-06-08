import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { instanceOf } from 'prop-types';
import styles from './LoginForm.module.css';
import { Cookies, withCookies } from '../../common/auth/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../common/auth/auth_utils';
// import Logo from '../../assets/tlp.png';

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
      await logInWithEmailAndPassword(email, password, '/', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    // <div className={styles['login-form-wrapper']}>
    // <div className={styles['logo-wrapper']}>
    //   <img className={styles.logo} src={Logo} alt="TLP Logo" />
    // </div>
    // {/* body of LoginForm */}
    <div className={styles['form-wrapper']}>
      <div className={styles.title}>Welcome!</div>
      <form className={styles.loginForm}>
        <div className={styles['email-input']}>
          <label className={styles['log-label']} htmlFor="email">
            Email
            {/* <br /> */}
            {/* <input
              type="text"
              id={styles.email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder="Email Address"
              required
            /> */}
          </label>
          <input
            type="text"
            id={styles.email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email Address"
            required
          />
        </div>
        <div className={styles['password-input']}>
          <label className={styles['log-label']} htmlFor="password">
            Password
            {/* <br />
            <input
              type={passwordShown ? 'text' : 'password'}
              onChange={({ target }) => setPassword(target.value)}
              id={styles.password}
              placeholder="Password"
              required
            />
          <FaEye id={styles.eyeIcon} color="black" onClick={togglePasswordVisibility} /> */}
          </label>
          <input
            type={passwordShown ? 'text' : 'password'}
            onChange={({ target }) => setPassword(target.value)}
            id={styles.password}
            placeholder="Password"
            required
          />
          <FaEye
            id={styles.eyeIcon}
            className={styles.eyeIcon}
            color="black"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div className={styles['remember-me-box']}>
          <label htmlFor="rememberBox" style={{ color: 'white' }}>
            <input
              type="checkbox"
              id={styles['remember-box']}
              checked={rememberMe}
              onChange={toggleRememberMe}
            />
            <span className={styles['remember-me-text']}>Remember Me?</span>
          </label>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <input
          id={styles['submit-button']}
          type="submit"
          value="Login"
          style={{ backgroundColor: '#3288C4', color: '#FFFFFF' }}
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.links}>
        <a id="forgotPassword" href="login/recover-password" className={styles['forgot-password']}>
          Forgot password?
        </a>
      </div>
    </div>
    // </div>
  );
};

LoginForm.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(LoginForm);
