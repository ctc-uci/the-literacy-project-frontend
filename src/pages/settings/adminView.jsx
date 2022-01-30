import './settings.css';
import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';

const AdminView = ({ name, email, active }) => {
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

  return (
    <div>
      <div className="row">
        <div className="col-md-4 offset-md-2">
          <h5 className="label-heading">Name</h5>
          <p className="user-data">{name}</p>
        </div>
        <div className="col-md-4 offset-md-1">
          <h5 className="label-heading">Status</h5>
          {statusBtn}
        </div>
      </div>
      <div className="row ">
        <div className="col-md-4 offset-md-2">
          <h5 className="label-heading">Email</h5>
          <div className="row">
            <p className="user-data col">{email}</p>
            <div className="col-sm-3">
              <Link to="/settings/edit">
                <input type="button" value="Change Email" className="btn btn-warning btn-sm" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AdminView.defaultProps = {
  name: 'firstname lastname',
  email: 'firstname.lastname@gmail.com',
  active: false,
};

AdminView.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  active: PropTypes.bool,
};

export default AdminView;
