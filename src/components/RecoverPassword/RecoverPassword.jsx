import React, { useState } from 'react';
import { sendPasswordReset, useNavigate } from '../../common/auth/auth_utils';
import styles from './RecoverPassword.module.css';
import logo from '../../assets/tlp.png';

function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const goToLogin = () => {
    navigate('/');
  };
  const handleForgotPassword = async e => {
    try {
      e.preventDefault();
      await sendPasswordReset(email);
      setEmail('');
      setConfirmed(!confirmed);
    } catch (err) {
      setConfirmed(!confirmed);
    }
  };

  if (confirmed) {
    return (
      <div className={styles.outer}>
        <img className={styles.logo} src={logo} alt="TLP Logo" />
        <div className={styles['form-wrapper']}>
          <h1 className={styles.recover}>Instructions on resetting your password has been sent.</h1>
          <form className={styles['recover-form']} onSubmit={goToLogin}>
            <div style={{ color: 'white' }}>
              Please check your email for futher instructions on how to recover your account.
            </div>
            <input
              id="recoverButton"
              type="submit"
              value="Back to Login"
              style={{ fontSize: '20px', backgroundColor: '#BBCBE2' }}
            />
          </form>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.outer}>
      <img className={styles.logo} src={logo} alt="TLP Logo" />
      {/* body of RecoverPassword */}
      <div className={styles['form-wrapper']}>
        <h1 className={styles.recover}>
          {' '}
          Recover <br /> Password{' '}
        </h1>
        <form className={styles['recover-form']} onSubmit={handleForgotPassword}>
          {/* email input and label */}
          <div className={styles['email-input']}>
            <label className={styles['rec-label']} htmlFor="email">
              Enter your email and instructions will be sent to recover your password.
              <br />
              <input
                type="email"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email Address"
                id={styles['email-input']}
                required
              />
            </label>
          </div>
          {/* recover button */}
          <input
            id={styles['recover-button']}
            type="submit"
            value="Send Email"
            style={{ fontSize: '20px', backgroundColor: '#BBCBE2' }}
          />
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
