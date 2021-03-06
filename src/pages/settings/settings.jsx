import '../../custom.scss';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import styles from './settings.module.css';
import TeacherView from './teacherView';
import AdminView from './adminView';
import { logout, useNavigate } from '../../common/auth/auth_utils';
import { TLPBackend, formatPhoneNumber, capitalize } from '../../common/utils';
import { Cookies, withCookies, cookieKeys } from '../../common/auth/cookie_utils';
import { AUTH_ROLES } from '../../common/config';
import CommonAlert from '../../common/CommonAlert/CommonAlert';

const SettingsView = ({ cookies }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const infoUpdateSuccess = location?.state?.infoUpdateSuccess;
  const [alertState, setAlertState] = useState({
    variant: 'success',
    open: true,
  });

  const [userInfo, setUserInfo] = useState({});
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

  useEffect(async () => {
    let res;
    if (role === AUTH_ROLES.ADMIN_ROLE) {
      res = await TLPBackend.get(`/admins/${Number(userId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      res = await TLPBackend.get(`/teachers/${Number(userId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    if (res.status === 200) {
      setUserInfo({
        fullName: `${res.data.firstName} ${res.data.lastName}`,
        email: res.data.email,
        phoneNumber: formatPhoneNumber(res.data.phoneNumber),
        status: capitalize(res.data.active),
      });
    } else {
      setErrorMessage(errorMessage);
    }
  }, []);
  return (
    <div>
      {infoUpdateSuccess && (
        <CommonAlert
          variant={alertState.variant}
          open={alertState.open}
          setOpen={val => setAlertState({ ...alertState, open: val })}
        >
          Successfully saved changes!
        </CommonAlert>
      )}
      <div className={styles['setting-view']}>
        <h1 id={styles['settings-title']}>Settings</h1>
        {role === AUTH_ROLES.ADMIN_ROLE ? (
          <AdminView userInfo={userInfo} />
        ) : (
          <TeacherView userInfo={userInfo} />
        )}
        <p id={styles.logout} onClick={handleLogOut} aria-hidden="true">
          Log Out
        </p>
      </div>
    </div>
  );
};

SettingsView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(SettingsView);
