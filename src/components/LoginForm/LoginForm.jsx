import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import { instanceOf } from 'prop-types';
import { Cookies, withCookies } from '../../common/auth/cookie_utils';
import { logInWithEmailAndPassword, useNavigate } from '../../common/auth/auth_utils';
import styles from './LoginForm.module.css';

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

  return (
    <div className={styles['login-form-wrapper']}>
      {/* body of LoginForm */}
      <div className={styles['form-wrapper']}>
        <h1 className={styles.title}> Log In </h1>
        <form>
          <div className={styles['email-input']}>
            <label className={styles['log-label']} htmlFor="email">
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
          <div className={styles['password-input']}>
            <label className={styles['log-label']} htmlFor="password">
              Password
              <br />
              <input
                type={passwordShown ? 'text' : 'password'}
                onChange={({ target }) => setPassword(target.value)}
                id={styles.password}
                placeholder="Password"
                required
              />
              <FaEye id={styles['eye-icon']} color="black" onClick={togglePasswordVisibility} />
            </label>
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
            style={{ backgroundColor: '#BBCBE2', color: '#212529' }}
            onClick={handleSubmit}
          />
        </form>
        <div className={styles.links}>
          <a id="forgotPassword" href="login/recover-password">
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
