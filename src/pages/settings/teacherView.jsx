import './settings.css';
import React from 'react';
import { PropTypes } from 'prop-types';
// import { Navigate } from 'react-router-dom';

const TeacherView = ({ name, email, district, active }) => {
  let statusBtn = (
    <input type="button" value="Active" id="status" className="btn btn-success btn-sm" disabled />
  );
  if (!active) {
    statusBtn = (
      <input type="button" value="Inactive" className="btn btn-secondary btn-sm" disabled />
    );
  }

  return (
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
  );
};

TeacherView.defaultProps = {
  name: 'firstname lastname',
  email: 'firstname.lastname@gmail.com',
  active: false,
  district: 'default district',
};

TeacherView.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  active: PropTypes.bool,
  district: PropTypes.string,
};

export default TeacherView;
