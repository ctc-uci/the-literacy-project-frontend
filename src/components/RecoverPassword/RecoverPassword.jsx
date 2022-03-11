import React, { useState } from 'react';
import { sendPasswordReset } from '../../common/auth/auth_utils';
import './RecoverPassword.css';

function RecoverPassword() {
  const [email, setEmail] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const handleForgotPassword = async e => {
    try {
      e.preventDefault();
      await sendPasswordReset(email);
      setConfirmationMessage(
        'If the email entered is associated with an account, you should receive an email to reset your password shortly.',
      );
      setErrorMessage('');
      setEmail('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <div>
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
          <input id="recoverButton" type="submit" value="Send Email" />
          {errorMessage && <p>{errorMessage}</p>}
          {confirmationMessage && <p>{confirmationMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
