import { React } from 'react';
import { PropTypes } from 'prop-types';
import './MasterTeacherConfirmationModal.css';

const MasterTeacherConfirmationModal = ({ isOpen, setIsOpen }) => {
  // console.log('isOpen is');
  // console.log(isOpen);
  // console.log('setIsOpen is');
  // console.log(setIsOpen);

  return isOpen ? (
    <>
      <div className="master-teacher-confirmation-modal">
        <div className="master-teacher-confirmation-modal-top-bar">
          {/* create the title and the x button
          (clicking the x button should set something to false so that the modal doesn't show) */}
          <div className="master-teacher-confirmation-modal-top-bar-title">
            Master Teacher Confirmation
          </div>
          <div className="master-teacher-confirmation-modal-exit-button">
            <button
              type="button"
              className="master-teacher-confirmation-modal-exit-button"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              X
            </button>
          </div>
        </div>
        <div className="master-teacher-confirmation-modal-body">
          {/* create the form */}
          <div className="master-teacher-confirmation-modal-field-desc">
            <p className="master-teacher-confirmation-modal-msg">
              Verification email was sent. Once confirmed, the master-teacher will be in the system.
            </p>
          </div>
        </div>
        <div className="master-teacher-confirmation-modal-bottom-bar">
          <button
            type="button"
            className="master-teacher-confirmation-modal-save-close-button"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="master-teacher-confirmation-modal-create-another-button"
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

MasterTeacherConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default MasterTeacherConfirmationModal;
