import './settings-edit.css';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';

const SettingsEditView = () => {
  const name = 'LastName FirstName';
  const email = 'firstname.lastname@gmail.com';
  const district = 'Irvine';

  const active = true;
  let statusBtn = (
    <input
      type="button"
      value="Active"
      id="status"
      className="btn btn-success btn-sm status-btn"
      disabled
    />
  );
  if (!active) {
    statusBtn = (
      <input
        type="button"
        value="Inactive"
        className="btn btn-secondary btn-sm status-btn"
        disabled
      />
    );
  }

  // eye icon in password input, toggles hiding password
  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const showOldPasswod = () => {
    setOldPasswordShown(!oldPasswordShown);
  };
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const showNewPasswod = () => {
    setNewPasswordShown(!newPasswordShown);
  };
  const [renewPasswordShown, setRenewPasswordShown] = useState(false);
  const showRenewPasswod = () => {
    setRenewPasswordShown(!renewPasswordShown);
  };

  // can't commit, there is ESLINT error b/c of the ... on line 54
  // checks if new passwords match
  // const [passwordValues, setPasswordValues] = useState({
  //   newPassword: '',
  //   renewPassword: '',
  //   passwordsMatch: true,
  // });
  // const handlePasswordChange = event => {
  //   const { id, value } = event.target;
  //   setPasswordValues({ ...passwordValues, [id]: value });

  //   if (passwordValues.newPassword !== passwordValues.renewPassword) {
  //     passwordValues.passwordsMatch = false;
  //   } else {
  //     passwordValues.passwordsMatch = true;
  //   }
  // };

  // still need to implement an admin vs teacher view
  // const isTeacher = false;

  return (
    <div className="setting-view container">
      <h1 className="title">Settings</h1>
      <center>
        <div className="profile-pic">{/* Insert image of profile picture */}</div>
      </center>

      <h3 className="offset-md-1 sub-title">Account Information</h3>
      <div className="row">
        <div className="col-md-4 offset-md-2">
          <h5 className="label-heading">Name</h5>
          <p className="user-data">{name}</p>
        </div>
        <div className="col-md-4 offset-md-1">
          <h5 className="label-heading">District</h5>
          <p className="user-data">{district}</p>
        </div>
      </div>
      <div className="row ">
        {/* <form className="col-md-4 offset-md-2"> */}
        <label htmlFor="email" className="label-heading col-md-4 offset-md-2">
          Email
          <div className="row">
            <input
              type="text"
              id="email"
              placeholder={email}
              className="form-control col user-input"
            />
            <input type="button" value="Save Email" className="btn btn-warning btn-sm col-sm-3" />
          </div>
        </label>
        {/* </form> */}
        <div className="col-md-4 offset-md-1">
          <h5 className="label-heading">Status</h5>
          {statusBtn}
        </div>
      </div>
      {/* {isTeacher ? (
        <TeacherView name={name} email={email} active={active} district={district} />
      ) : (
        <AdminView name={name} email={email} status={active} />
      )} */}

      <h3 className="offset-md-1 subtitle">Password</h3>
      <form className="container">
        <div className="row">
          <label htmlFor="oldPassword" className="col-md-3 offset-md-2 pwdLabel">
            Current Password
            <input
              type={oldPasswordShown ? 'text' : 'password'}
              htmlFor="oldPassword"
              id="oldPassword"
              className="form-control"
            />
            <FaEye className="eyeIcon" color="black" onClick={showOldPasswod} />
            <small className="form-text text-muted"> Forgot Password? </small>
          </label>
          <label htmlFor="newPassword" className="col-md-3 pwdLabel">
            New Pasword
            <input
              type={newPasswordShown ? 'text' : 'password'}
              htmlFor="newPassword"
              id="newPassword"
              className="form-control"
              // onChange={handlePasswordChange}
            />
            <FaEye className="eyeIcon" color="black" onClick={showNewPasswod} />
            <small className="form-text text-danger"> Please enter valid password </small>
          </label>
          <div className="col">
            <input
              type="button"
              value="Save Changes"
              className="btn btn-warning btn-sm change-button "
            />
          </div>
        </div>
        <div className="row">
          <label htmlFor="renewPassword" className="col-md-3 offset-md-5 pwdLabel">
            Re-Enter New Password
            <input
              type={renewPasswordShown ? 'text' : 'password'}
              htmlFor="renewPassword"
              id="renewPassword"
              className="form-control"
              // onChange={handlePasswordChange}
            />
            <FaEye className="eyeIcon" color="black" onClick={showRenewPasswod} />
            <small className="form-text text-danger">
              Both passwords must match
              {/* {!passwordValues.passwordsMatch ? 'Both passwords must match' : ''} */}
            </small>
          </label>
        </div>
      </form>

      {/* <h3 className="offset-md-1 sub-title">Accessibility</h3>
      <p className="col-md-4 offset-md-2 label-heading">Text Size</p> */}

      <div className="logout">
        <p>log out</p>
      </div>
    </div>
  );
};

export default SettingsEditView;
