import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { finishAccountSetUp } from '../../common/auth/auth_utils';

const FinishAccount = ({ inviteId, data }) => {
  const [password, setPassword] = useState();
  const [checkPassword, setCheckPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [confirmationMessage, setConfirmationMessage] = useState();
  const handleResetPassword = async e => {
    try {
      e.preventDefault();
      setErrorMessage('');
      if (password !== checkPassword) {
        throw new Error("Passwords don't match");
      }
      await finishAccountSetUp(inviteId, password);

      setConfirmationMessage(
        'Your account is set up. You can now login in with your email and password',
      );
      setErrorMessage('');
      setPassword('');
    } catch (err) {
      setErrorMessage(err.message);
    }
  };
  return (
    <div>
      <h2>Finish Account Creation</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {!confirmationMessage && (
        <form onSubmit={handleResetPassword}>
          <input placeholder="First Name" disabled value={data.firstName} />
          <br />
          <input placeholder="Last Name" disabled value={data.lastName} />
          <br />
          <input placeholder="Email" disabled value={data.email} />
          <br />
          <input placeholder="Position" disabled value={data.position} />
          <br />
          <input
            type="password"
            onChange={({ target }) => setPassword(target.value)}
            placeholder="New Password"
          />
          <br />
          <input
            type="password"
            onChange={({ target }) => setCheckPassword(target.value)}
            placeholder="Re-enter Password"
          />
          <br />
          <button type="submit">Set Password</button>
        </form>
      )}
      {confirmationMessage && (
        <div>
          <p>{confirmationMessage}</p>
          <a href="/login">Back to Login</a>
        </div>
      )}
    </div>
  );
};

FinishAccount.propTypes = {
  inviteId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf.isRequired,
};

export default FinishAccount;
