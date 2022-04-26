import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './settings.module.css';
import AccountInformationView from './accountInformationView';
import PasswordView from './passwordView';

const AdminView = ({ userInfo }) => {
  return (
    <div id={styles['admin-settings']}>
      <AccountInformationView userInfo={userInfo} />
      <PasswordView userInfo={userInfo} />
    </div>
  );
};

AdminView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default AdminView;
