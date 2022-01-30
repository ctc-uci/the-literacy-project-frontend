import React from 'react';
import './RecoverPassword.css';

function RecoverPassword() {
  return (
    <div>
      {/* body of RecoverPassword */}
      <div className="formWrapper">
        <h1 className="recover">
          {' '}
          Recover <br /> Password{' '}
        </h1>

        <form>
          {/* email input and label */}
          <div className="emailInput">
            <label htmlFor="email">
              Enter your email and instructions will be sent to recover your password.
              <br />
              <input type="text" id="emailInput" placeholder="Email Address" />
            </label>
          </div>

          {/* recover button */}
          <input id="recoverButton" type="submit" value="Send Email" />
        </form>
      </div>
    </div>
  );
}

export default RecoverPassword;
