import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateAdminModal.css';

const CreateAdminModal = ({ isOpen, setIsOpen }) => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);
  const [email, setEmail] = useState('default@email.com');

  return isOpen ? (
    <>
      <div className="create-admin-modal">
        <div className="create-admin-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="create-admin-modal-top-bar-title">Create Admin Account</div>
          <div className="create-admin-modal-exit-button">
            <button
              type="button"
              className="create-admin-modal-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="create-admin-modal-body">
          {/* create the form */}
          <div className="create-admin-modal-field-desc">Email</div>
          <input
            className="modal-text-input"
            type="text"
            defaultValue={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="create-admin-modal-bottom-bar">
          {/* create the save + add another / save buttons */}
          {/* change save function later */}
          <button
            type="button"
            className="create-admin-modal-send-another-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Save and Create Another
          </button>
          <button
            type="button"
            className="create-admin-modal-save-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Send Email
          </button>
        </div>
      </div>
    </>
  ) : null;
};

CreateAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateAdminModal;
