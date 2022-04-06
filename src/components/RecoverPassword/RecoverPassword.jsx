import React, { useState } from 'react';
import { sendPasswordReset, useNavigate } from '../../common/auth/auth_utils';
import './RecoverPassword.css';
import logo from '../../assets/tlp.png';

function RecoverPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const goToLogin = () => {
    navigate('/');
  };
  const handleForgotPassword = async e => {
    try {
      e.preventDefault();
      await sendPasswordReset(email);
      setConfirmed(!confirmed);
      setErrorMessage('');
      setEmail('');
    } catch (err) {
      setErrorMessage('Invalid Email');
    }
  };
  if (confirmed) {
    return (
      <div className="outer">
        <img className="logo" src={logo} alt="TLP Logo" />
        <div className="formWrapper">
          <h1 className="recover">Instructions on resetting your password has been sent.</h1>
          <form className="recoverForm" onSubmit={goToLogin}>
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
    <div className="outer">
      <img className="logo" src={logo} alt="TLP Logo" />
      {/* body of RecoverPassword */}
      <div className="formWrapper">
        <h1 className="recover">
          {' '}
          Recover <br /> Password{' '}
        </h1>
        <form className="recoverForm" onSubmit={handleForgotPassword}>
          {/* email input and label */}
          <div className="emailInput">
            <label className="recLabel" htmlFor="email">
              Enter your email and instructions will be sent to recover your password.
              <br />
              <input
                type="text"
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                placeholder="Email Address"
                id="emailInput"
                required
              />
            </label>
          </div>
          {/* recover button */}
          <input
            id="recoverButton"
            type="submit"
            value="Send Email"
            style={{ fontSize: '20px', backgroundColor: '#BBCBE2' }}
          />
          <span className="errorMessage">{errorMessage}</span>
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
