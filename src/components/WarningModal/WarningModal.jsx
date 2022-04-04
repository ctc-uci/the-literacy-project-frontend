import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

const WarningModal = ({ isOpen, setIsOpen, name, body }) => {
  const [showAlert, setShowAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowAlert(true);
  };
  const bodies = {
    site: (
      <p style={{ textAlign: 'center' }}>
        The site and students in it will no longer be available after deletion.{' '}
        <span style={{ fontStyle: 'italic' }}>You cannot undo this</span>. If you want to keep the
        sites and area in it, you can choose to make this site{' '}
        <span style={{ fontWeight: 'bold' }}>inactive</span> instead
      </p>
    ),
    area: (
      <p style={{ textAlign: 'center' }}>
        The area, sites and students in it will no longer be available after deletion.{' '}
        <span style={{ fontStyle: 'italic' }}>You cannot undo this</span>. If you want to keep the
        area and sites in it, you can choose to make this area{' '}
        <span style={{ fontWeight: 'bold' }}>inactive</span> instead
      </p>
    ),
    teacher: (
      <p style={{ textAlign: 'center' }}>
        The teacher will no longer be available after deletion.{' '}
        <span style={{ fontStyle: 'italic' }}>You cannot undo this</span>. If you want to keep the
        teacher, you can choose to make them <span style={{ fontWeight: 'bold' }}>inactive</span>{' '}
        instead
      </p>
    ),
    student: (
      <p style={{ textAlign: 'center' }}>
        The student will no longer be available after deletion.{' '}
        <span style={{ fontStyle: 'italic' }}>You cannot undo this</span>. Did you want to edit this
        student instead?
      </p>
    ),
    group: (
      <div style={{ textAlign: 'center' }}>
        <p>
          The student group information will no longer be available after this deletion.*
          <span style={{ fontStyle: 'italic' }}>You cannot undo this</span>.
        </p>
        <p>*You can still access the students in this group after deletion.</p>
      </div>
    ),
  };

  return (
    <>
      <Modal show={isOpen} onHide={closeModal}>
        <div className="modal-header text-center" style={{ color: '#E53E3E' }} closeButton>
          <h3 className="modal-title w-100">Warning</h3>
        </div>
        <Modal.Body>
          <p style={{ fontSize: '20px', textAlign: 'center' }}>
            Are you sure you want to delete <span style={{ fontWeight: 'bold' }}>{name}</span>?
          </p>
          {bodies[body]}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Yes, Delete
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="primary" className="alert-custom">
            Successfully deleted {name}.{' '}
            <Alert.Link href="/people" className="alert-link-custom">
              UNDO
            </Alert.Link>
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

WarningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default WarningModal;
