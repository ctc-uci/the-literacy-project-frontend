import { React } from 'react';
import { PropTypes } from 'prop-types';
import './ConfirmTeacherModal.css';

const ConfirmTeacherModal = ({ isOpen, setIsOpen }) => {
  return isOpen ? (
    <>
      <div className="confirm-teacher-modal">
        <div className="confirm-teacher-modal-top-bar">
          <div className="confirm-teacher-modal-title">Teacher Confirmation</div>
        </div>
        <div className="confirm-teacher-main">
          <div className="main-text">
            Verification email was sent. Once confirmed, the teacher will be in the system.
          </div>
          <button
            type="button"
            className="create-teacher-exit-button"
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

ConfirmTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ConfirmTeacherModal;
