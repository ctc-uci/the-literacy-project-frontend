import './settings.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { instanceOf } from 'prop-types';
import TeacherView from './teacherView';
import AdminView from './adminView';
import { logout, useNavigate } from '../../utils/auth/auth_utils';
import { Cookies, withCookies } from '../../utils/auth/cookie_utils';

// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SettingsView = ({ cookies }) => {
  // Placeholders, replace later with backend call
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const handleLogOut = async () => {
    try {
      await logout('/login', navigate, cookies);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const name = 'LastName FirstName';
  const email = 'firstname.lastname@gmail.com';
  const password = '********';
  const district = 'Irvine';
  const active = true;
  const isTeacher = true;
  // TODO: accessibility toggle
  return (
    <div className="setting-view container">
      <h1 className="title">Settings</h1>
      <center>
        <div className="profile-pic">{/* Insert image of profile picture */}</div>
      </center>
      <h3 className="offset-md-1 sub-title">Account Information</h3>

      {isTeacher ? (
        <TeacherView name={name} email={email} active={active} district={district} />
      ) : (
        <AdminView name={name} email={email} status={active} />
      )}

      <h3 className="offset-md-1 subtitle">Password</h3>
      <div className="col-md-4 offset-md-2">
        <div className="row">
          <p className="col">Current Password</p>
          <p className="user-data col-3">{password}</p>
          <div className="col">
            <Link to="/settings/edit">
              <input type="button" value="Change Password" className="btn btn-warning btn-sm " />
            </Link>
          </div>
        </div>
      </div>

      {/* ACCESSIBILITY option */}

      <div className="logout">
        {errorMessage && <p>{errorMessage}</p>}
        <input
          type="button"
          value="Log Out"
          className="btn btn-danger btn-sm "
          onClick={handleLogOut}
        />
      </div>
    </div>
  );
};

SettingsView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(SettingsView);
