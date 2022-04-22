import React, { useState } from 'react';
import { instanceOf } from 'prop-types';
import { useNavigate, useLocation } from 'react-router-dom';
import { logout } from '../../common/auth/auth_utils';
import { Cookies, withCookies, cookieKeys } from '../../common/auth/cookie_utils';
import { AUTH_ROLES } from '../../common/config';
import styles from './settings-edit.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import AdminSettingsEditView from './adminSettingsEditView';
import TeacherSettingsEditView from './teacherSettingsEditView';

const SettingsEditView = ({ cookies }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState();

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const role = cookies.get(cookieKeys.POSITION);
  const userId = Number(cookies.get(cookieKeys.USER_ID));

  return (
    <div>
      <NavigationBar />
      <div className={styles['setting-view']}>
        <h1 id={styles['settings-title']}>Settings</h1>
        {role === AUTH_ROLES.ADMIN_ROLE ? (
          <AdminSettingsEditView userInfo={userInfo} userId={userId} />
        ) : (
          <TeacherSettingsEditView userInfo={userInfo} userId={userId} />
        )}
        <p id={styles.logout} onClick={handleLogOut} aria-hidden="true">
          Log Out
        </p>
      </div>
    </div>
  );
};

SettingsEditView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(SettingsEditView);
