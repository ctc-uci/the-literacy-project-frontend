import React, { useEffect, useState } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ResetPassword from '../ResetPassword/ResetPassword';
import FinishAccount from '../FinishAccount/FinishAccount';
import VerifyEmail from '../VerifyEmail/VerifyEmail';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { TLPBackend } from '../../common/utils';

const EmailAction = ({ redirectPath }) => {
  const { search } = useLocation();
  const mode = new URLSearchParams(search).get('mode');
  const code = new URLSearchParams(search).get('oobCode');
  const [isLoading, setIsLoading] = useState(true);
  const [inviteId, setInviteId] = useState(new URLSearchParams(search).get('inviteID'));
  const [inviteData, setInviteData] = useState(new URLSearchParams(search).get('inviteID'));

  useEffect(async () => {
    // check if code (inviteID) is valid with backend
    // if not redirect to error page -- invite link is invalid
    // else redirect to recover password page
    if (mode === 'inviteUser' && inviteId !== null) {
      const user = await TLPBackend.get(`/tlp-users/invite/${inviteId}`);
      if (!(user && user.data)) {
        setInviteId(null);
      } else {
        setInviteData(user.data);
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (mode === 'inviteUser') {
    if (inviteId === null) {
      // TODO: Change redirect path for invalid invite?
      return <Navigate to={redirectPath} />;
    }
    return <FinishAccount inviteId={inviteId} data={inviteData} />;
  }

  if (code === null) {
    return <Navigate to={redirectPath} />;
  }

  return mode === 'resetPassword' ? <ResetPassword code={code} /> : <VerifyEmail code={code} />;
};

EmailAction.propTypes = {
  redirectPath: PropTypes.string.isRequired,
};

export default EmailAction;
