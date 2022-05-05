import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StatusCell.module.css';
import { sendInviteLink, sendLoginLink } from '../../common/auth/auth_utils';
import { AUTH_ROLES, USER_STATUS } from '../../common/config';

const StatusCell = ({ data }) => {
  const [expireTime, setExpireTime] = useState();
  const status = data.active ? data.active : USER_STATUS.PENDING;
  const { position, email, firstName, lastName, phoneNumber } = data;

  const resendEmail = async () => {
    // admins get a new invite email
    if (position === AUTH_ROLES.ADMIN_ROLE) {
      console.log('resending invite');
      await sendInviteLink(position, email, firstName, lastName, phoneNumber);
      // update expiration time to 7 days if sending invite is successful
      setExpireTime(7);
    }
    // master teachers get email to the website
    else {
      console.log('master teacher invite');
      await sendLoginLink(email);
    }
  };

  useEffect(() => {
    // only admin invites have an expiration date
    if (position === AUTH_ROLES.ADMIN_ROLE) {
      const expire = new Date(data.expireTime);
      setExpireTime(Math.floor((expire - Date.now()) / (1000 * 3600 * 24)));
    }
  }, []);

  if (status === USER_STATUS.ACTIVE) {
    return (
      <div style={{ fontWeight: 'bold' }}>
        <div style={{ color: '#28a745' }}>Active</div>
      </div>
    );
  }

  return (
    <div style={{ fontWeight: 'bold' }}>
      <div style={{ color: '#17A2B8' }}>Account Pending</div>
      {position === AUTH_ROLES.ADMIN_ROLE && (
        <div style={{ color: '#e53e3e' }}>({expireTime} day(s) until link expiration)</div>
      )}
      <button type="button" className={styles['resend-email']} onClick={resendEmail}>
        Resend Email
      </button>
    </div>
  );
};

StatusCell.propTypes = {
  data: PropTypes.shape({
    position: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    active: PropTypes.string,
    expireTime: PropTypes.string,
  }).isRequired,
};

export default StatusCell;
