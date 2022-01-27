import './settings-edit.css';
import React from 'react';

const SettingsEditView = () => {
  const name = 'LastName FirstName';
  const email = 'firstname.lastname@gmail.com';
  const district = 'Irvine';

  const active = true;
  let statusBtn = (
    <input type="button" value="Active" id="status" className="btn btn-success btn-sm" disabled />
  );
  if (!active) {
    statusBtn = (
      <input type="button" value="Inactive" className="btn btn-secondary btn-sm" disabled />
    );
  }
  // still need to implement an admin vs teacher view
  // const isTeacher = true;

  return (
    <div className="setting-view container">
      <h1 className="title">Settings</h1>
      <center>
        <div className="profile-pic">{/* Insert image of profile picture */}</div>
      </center>
      <h3 className="offset-md-1 sub-title">Account Information</h3>
      <form>
        <div className="row">
          <label htmlFor="name" className="form-label col-md-4 offset-md-2 label-heading">
            Name
            <input
              type="text"
              id="name"
              value={name}
              className="form-control-plaintext transparent-input"
              readOnly
            />
          </label>
          <label htmlFor="district" className="form-label col-md-4 offset-md-1 label-heading">
            District
            <input
              type="text"
              value={district}
              id="district"
              className="form-control-plaintext transparent-input"
              readOnly
            />
          </label>
        </div>
        <div className="row ">
          <label htmlFor="email" className="col-md-4 offset-md-2 label-heading">
            Email
            <div className="row">
              <input type="text" id="email" value={email} className="form-control col user-input" />
              <input
                type="button"
                value="Save Email"
                className="btn btn-warning btn-sm col-sm-3"
                // onClick={onSubmit}
              />
            </div>
          </label>
          <label htmlFor="status" className="col-md-4 offset-md-1 label-heading">
            Status
            <div className="status-btn"> {statusBtn} </div>
          </label>
        </div>
      </form>
      {/* {isTeacher ? (
        <TeacherView name={name} email={email} active={active} district={district} />
      ) : (
        <AdminView name={name} email={email} status={active} />
      )} */}

      <h3 className="offset-md-1 subtitle">Password</h3>
      <form className="container">
        <div className="row">
          <label htmlFor="curr-password" className="col-md-3 offset-md-2">
            Current Password
            <input
              type="text"
              htmlFor="password"
              id="curr-password"
              // value=""
              className="form-control"
            />
            <small id="emailHelp" className="form-text text-muted">
              Forgot Password?
            </small>
          </label>
          <label htmlFor="new-password" className="col-md-3">
            New Pasword
            <input
              type="text"
              htmlFor="new-password"
              id="new-password"
              // value=""
              className="form-control"
            />
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
          <label htmlFor="renew-password" className="col-md-3 offset-md-5">
            Re-Enter New Password
            <input
              type="text"
              htmlFor="renew-password"
              id="renew-password"
              // value=""
              className="form-control"
            />
          </label>
        </div>
      </form>
      <div className="logout">
        <p>log out</p>
      </div>
    </div>
  );
};

export default SettingsEditView;
