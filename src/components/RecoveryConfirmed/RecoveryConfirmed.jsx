import React from 'react';
import './RecoveryConfirmed.css';

function RecoverPassword() {
  return (
    <div>
      {/* body of RecoveryConfirmed */}
      <div className="wrapper">
        <h1 className="recoveryConfirmed">
          Instructions on reseting your password have been sent.
        </h1>

        <p className="subText">
          Please check your email for further information on how to access your account.
        </p>
      </div>
    </div>
  );
}

export default RecoverPassword;
