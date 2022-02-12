import { React } from 'react';
import { PropTypes } from 'prop-types';
import './ConfirmMasterTeacherModal.css';

const ConfirmMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  return isOpen ? (
    <>
      <div className="confirm-master-teacher-modal">
        <div className="confirm-master-teacher-modal-top-bar">
          <div className="confirm-master-teacher-modal-title">Teacher Confirmation</div>
        </div>
        <div className="confirm-master-teacher-main">
          <div className="main-text">
            Verification email was sent. Once confirmed, the master-teacher will be in the system.
          </div>
          <button
            type="button"
            className="create-master-teacher-exit-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            X
          </button>
          <button
            type="button"
            className="close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="send-another"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Send another
          </button>
        </div>
      </div>
    </>
  ) : null;
};

ConfirmMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ConfirmMasterTeacherModal;
