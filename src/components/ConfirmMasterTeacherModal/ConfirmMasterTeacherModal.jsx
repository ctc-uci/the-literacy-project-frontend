import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './ConfirmMasterTeacherModal.css';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

const ConfirmMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowAlert(true);
  };

  return (
    <>
      <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Teacher Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Verification email was sent. Once confirmed, the teacher will be in the system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Send Another
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="primary" className="alert-custom">
            Successfully created teacher accounts!{' '}
            <Alert.Link href="/people" className="alert-link-custom">
              Create more
            </Alert.Link>
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

ConfirmMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ConfirmMasterTeacherModal;
