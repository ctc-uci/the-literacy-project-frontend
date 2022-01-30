import { React } from 'react';
import { PropTypes } from 'prop-types';
import './TeacherConfirmationModal.css';

const TeacherConfirmationModal = ({ isOpen, setIsOpen }) => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);

  return isOpen ? (
    <>
      <div className="teacher-confirmation-modal">
        <div className="teacher-confirmation-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="teacher-confirmation-modal-top-bar-title">Teacher Confirmation</div>
          <div className="teacher-confirmation-modal-exit-button">
            <button
              type="button"
              className="teacher-confirmation-modal-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="teacher-confirmation-modal-body">
          {/* create the form */}
          <div className="teacher-confirmation-modal-field-desc">
            <p className="teacher-confirmation-modal-msg">
              Verification email was sent. Once confirmed, the teacher will be in the system.
            </p>
          </div>
        </div>
        <div className="teacher-confirmation-modal-bottom-bar">
          <button
            type="button"
            className="teacher-confirmation-modal-save-close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="teacher-confirmation-modal-create-another-button"
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

TeacherConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default TeacherConfirmationModal;
