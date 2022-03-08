import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecoverPassword from '../RecoverPassword/RecoverPassword';
import VerifyEmail from '../VerifyEmail/VerifyEmail';

const EmailAction = ({ redirectPath }) => {
  const { search } = useLocation();
  const mode = new URLSearchParams(search).get('mode');
  const code = new URLSearchParams(search).get('oobCode');

  if (code === null) {
    return <Navigate to={redirectPath} />;
  }
  return mode === 'resetPassword' ? <RecoverPassword code={code} /> : <VerifyEmail code={code} />;
};

EmailAction.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default EmailAction;
