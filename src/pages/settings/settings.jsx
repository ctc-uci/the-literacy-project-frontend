import './settings.css';
import React from 'react';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const SettingsView = () => {
  // Placeholders, replace later with backend call

  const name = 'LastName FirstName';
  const email = 'firstname.lastname@gmail.com';
  const password = '********';
  const district = 'Irvine';

  const active = true;
  let statusBtn;
  if (active) {
    statusBtn = (
      <input type="button" value="Active" id="status" className="btn btn-success btn-sm" />
    );
  } else {
    statusBtn = (
      <input type="button" value="Inactive" className="btn btn-secondary btn-sm" disabled />
    );
  }

  return (
    <div className="setting-view">
      <h1 className="title">Settings</h1>
      <center>
        <div className="profile-pic">{/* Insert image of profile picture */}</div>
      </center>
      <h3 className="offset-md-2 sub-title">Account Information</h3>
      <form className="container">
        <div className="row">
          <label htmlFor="name" className="form-label col-md-4 offset-md-2 label-heading my-3">
            Name
            <input
              type="text"
              id="name"
              value={name}
              className="form-control-plaintext transparent-input"
              readOnly
            />
          </label>
          <label htmlFor="district" className="form-label col-md-4 offset-md-1 label-heading my-3">
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
          <label htmlFor="email" className="col-md-4 offset-md-2 label-heading my-3">
            Email
            <div className="row">
              <input
                type="text"
                id="email"
                value={email}
                className="transparent-input col"
                readOnly
              />
              <input
                type="button"
                value="Change Email"
                className="btn btn-warning btn-sm col-sm-3"
              />
            </div>
          </label>
          <label htmlFor="status" className="col-md-4 offset-md-1 label-heading my-3">
            Status
            <div> {statusBtn} </div>
          </label>
        </div>
      </form>
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
