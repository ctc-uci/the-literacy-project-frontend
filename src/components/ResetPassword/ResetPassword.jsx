import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye } from 'react-icons/fa';
import { confirmNewPassword } from '../../common/auth/auth_utils';
import styles from './ResetPassword.module.css';
import logo from '../../assets/tlp.png';

const ResetPassword = ({ code }) => {
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();

  // eye icon in password input, toggles hiding password
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };
  const [reEnterPasswordShown, setreEnterPasswordShown] = useState(false);
  const toggleReEnterPasswordVisibility = () => {
    setreEnterPasswordShown(!reEnterPasswordShown);
  };

  const handleResetPassword = async e => {
    try {
      e.preventDefault();
      setErrorMessage('');
      if (password !== checkPassword) {
        throw new Error('Passwords do not match');
      }
      await confirmNewPassword(code, password);
      setConfirmationMessage('Password changed. You can now sign in with your new password.');
      setErrorMessage('');
      setPassword('');
    } catch (err) {
      setError(!error);
      setErrorMessage(err.message);
    }
  };

  return (
    <div className={styles.outer}>
      <img className={styles.logo} src={logo} alt="TLP Logo" />
      <div className={styles['form-wrapper']}>
        <h1 className={styles.recover}>Reset Password</h1>
        {!confirmationMessage && (
          <form onSubmit={handleResetPassword}>
            <div className={styles['new-password']}>
              <label className={styles['log-label']} htmlFor="password">
                New Password
                <input
                  type={newPasswordShown ? 'text' : 'password'}
                  onChange={({ target }) => setPassword(target.value)}
                  placeholder="New Password"
                  id={error ? styles['password-invalid'] : styles.password}
                />
                <FaEye
                  id={styles['eye-icon']}
                  color="black"
                  onClick={toggleNewPasswordVisibility}
                />
              </label>
            </div>
            <div className={styles['re-enter-password']}>
              <label className={styles['log-label']} htmlFor="password">
                Re-Enter Password
                <input
                  type={reEnterPasswordShown ? 'text' : 'password'}
                  onChange={({ target }) => setCheckPassword(target.value)}
                  placeholder="Re-enter Password"
                  id={error ? styles['password-invalid'] : styles.password}
                />
                <FaEye
                  id={styles['eye-icon']}
                  color="black"
                  onClick={toggleReEnterPasswordVisibility}
                />
              </label>
            </div>
            <div className={styles['error-message']}>{errorMessage}</div>
            <input
              id={styles['submit-button']}
              type="submit"
              value="Reset Password"
              style={{ backgroundColor: '#BBCBE2', color: '#212529' }}
              onClick={handleResetPassword}
            />
          </form>
        )}
        {confirmationMessage && (
          <div>
            <p>{confirmationMessage}</p>
            <a href="/login">Back to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  code: PropTypes.string.isRequired,
};

export default ResetPassword;
