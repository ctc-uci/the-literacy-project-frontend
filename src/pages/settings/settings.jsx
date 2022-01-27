import './settings.css';
import React from 'react';
import TeacherView from './teacherView';
import AdminView from './adminView';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SettingsView = () => {
  // Placeholders, replace later with backend call

  const name = 'LastName FirstName';
  const email = 'firstname.lastname@gmail.com';
  const password = '********';
  const district = 'Irvine';
  const active = true;
  const isTeacher = true;
  // TODO: buttons don't redirect
  //       accessibility toggle
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
      <form className="container">
        <label htmlFor="password" className="offset-md-2">
          Current Password
          <input
            type="text"
            htmlFor="password"
            id="password"
            value={password}
            className="transparent-input"
            disabled
          />
          <input type="button" value="Change Password" className="btn btn-warning btn-sm" />
        </label>
      </form>

      {/* ACCESSIBILITY option */}

      <div className="logout">
        <p>log out</p>
      </div>
    </div>
  );
};

export default SettingsView;
