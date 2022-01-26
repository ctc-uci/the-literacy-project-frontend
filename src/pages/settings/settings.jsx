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
  const isTeacher = false;

  return (
    <div className="setting-view">
      <h1 className="title">Settings</h1>
      <center>
        <div className="profile-pic">{/* Insert image of profile picture */}</div>
      </center>
      <h3 className="offset-md-2 sub-title">Account Information</h3>
      {/* {view}
      {isTeacher && <h2> You have unread messages. </h2>} */}
      {isTeacher ? (
        <TeacherView name={name} email={email} active={active} district={district} />
      ) : (
        <AdminView name={name} email={email} status={active} />
      )}

      <h3 className="offset-md-2 mt-2 sub-title">Password</h3>
      <form className="container">
        <label htmlFor="password" className="offset-md-2 label-heading my-3">
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
      <div className="logout">
        <p>log out</p>
      </div>
    </div>
  );
};

export default SettingsView;
