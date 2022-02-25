import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateAreaModal.css';
import { Modal, Button, Form, Alert, CloseButton } from 'react-bootstrap';

const CreateAreaModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowAlert(true);
  };
  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowAlert(false);
  };
  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModalNoAlert}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Create New Area</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Form.Group className="mb-5" controlId="createArea.name">
              <Form.Label>Name</Form.Label>
              <Form.Control placeholder="Name" />
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Create and Add Another
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="primary" className="alert-custom">
            Successfully created area!{' '}
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

CreateAreaModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateAreaModal;
