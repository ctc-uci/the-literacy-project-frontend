import './settings-edit.css';
import React, { useState } from 'react';
import { FaEye } from 'react-icons/fa';
// import Alert from 'react-bootstrap/Alert';

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
  const showOldPassword = () => {
    setOldPasswordShown(!oldPasswordShown);
  };
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const showNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };
  const [renewPasswordShown, setRenewPasswordShown] = useState(false);
  const showRenewPassword = () => {
    setRenewPasswordShown(!renewPasswordShown);
  };

  // checks if new passwords match
  const [passwordsMatch, setPasswordMatch] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [renewPassword, setRenewPassword] = useState('');

  const handlePasswordChange = event => {
    const { id, value } = event.target;
    if (id === 'newPassword') {
      setNewPassword(value);
    } else {
      setRenewPassword(value);
    }

    if (newPassword === renewPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }

    // also could check the validity of the new password here

    // console.log(passwordsMatch, newPassword, renewPassword, event.target.value);
  };

  // still need to implement an admin vs teacher view
  // const isTeacher = false;

  return (
    <div className="setting-view container">
      {/* <Alert variant="success" dismissible>
        <p>Successfully changed password!</p>
      </Alert> */}
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
            <FaEye className="eyeIcon" color="black" onClick={showOldPassword} />
            <small className="form-text text-muted"> Forgot Password? </small>
          </label>
          <label htmlFor="newPassword" className="col-md-3 pwdLabel">
            New Pasword
            <input
              type={newPasswordShown ? 'text' : 'password'}
              htmlFor="newPassword"
              id="newPassword"
              className="form-control"
              onChange={handlePasswordChange}
            />
            <FaEye className="eyeIcon" color="black" onClick={showNewPassword} />
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
              onChange={handlePasswordChange}
            />
            <FaEye className="eyeIcon" color="black" onClick={showRenewPassword} />
            <small className="form-text text-danger">
              {!passwordsMatch ? 'Both passwords must match' : <br />}
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
