import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './AdminAccountModal.css';

const AdminAccountMode = ({ isOpen, setIsOpen }) => {
  const [email, setEmail] = useState('default@email.com');
  return isOpen ? (
    <div className="admin-system">
      <div className="admin-title">Create Admin Account</div>
      <div className="admin-email">Email</div>
      <button
        type="button"
        className="create-teacher-exit-button"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        X
      </button>
      <input
        className="email-input"
        type="text"
        defaultValue={email}
        onChange={e => setEmail(e.target.value)}
      />
      <button
        type="button"
        className="admin-save-button"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Save and Create Another
      </button>
      <button
        type="button"
        className="admin-send-email"
        onClick={() => {
          setIsOpen(false);
        }}
      >
        Send Email
      </button>
    </div>
  ) : null;
};

AdminAccountMode.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};
export default AdminAccountMode;
