import './settings-edit.css';
import React from 'react';
// import { BsEyeSlashFill } from 'react-icons/bs';

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
            <input type="text" htmlFor="oldPassword" id="oldPassword" className="form-control" />
            <small className="form-text text-muted"> Forgot Password? </small>
          </label>
          <label htmlFor="newPassword" className="col-md-3 pwdLabel">
            New Pasword
            <input type="text" htmlFor="newPassword" id="newPassword" className="form-control" />
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
              type="text"
              htmlFor="renewPassword"
              id="renewPassword"
              className="form-control"
            />
            <small className="form-text text-danger"> Both passwords must match </small>
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
