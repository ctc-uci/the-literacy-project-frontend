import { React } from 'react';
import { PropTypes } from 'prop-types';
import './CreateAdminConfirmationModal.css';

const CreateAdminConfirmationModal = ({ isOpen, setIsOpen }) => {
  return isOpen ? (
    <>
      <div className="create-admin-confirmation-modal">
        <div className="create-admin-confirmation-modal-top-bar">
          <div className="create-admin-confirmation-modal-top-bar-title">Admin Confirmation</div>
          <div className="create-admin-confirmation-modal-exit-button">
            <button
              type="button"
              className="create-admin-confirmation-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="create-admin-confirmation-modal-body">
          <p className="create-admin-confirmation-modal-body-text">
            Verification email was sent. Once confirmed, the teacher will be in the system.
          </p>
        </div>
        <div className="create-admin-confirmation-modal-bottom-bar">
          <button
            type="button"
            className="create-admin-confirmation-close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="create-admin-confirmation-send-another-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Send Another
          </button>
        </div>
      </div>
    </>
  ) : null;
};

CreateAdminConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateAdminConfirmationModal;
