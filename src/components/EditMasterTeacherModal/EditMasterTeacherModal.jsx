import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './EditMasterTeacherModal.css';
import { Modal, Button, Alert, CloseButton, Form } from 'react-bootstrap';

const EditMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [showEditMasterTeacherAlert, setShowEditMasterTeacherAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowEditMasterTeacherAlert(true);
  };

  const [status, setStatus] = useState('Active');

  return (
    <>
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Teacher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group className="mb-5" controlId="editTeacherAccount.firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="example@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" onChange={e => setStatus(e.target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              {status === 'Inactive' ? (
                <Form.Label id="status-inactive-text">
                  *** If a teacher is made inactive, their assigned sites will be removed from them.
                </Form.Label>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="editTeacherAccount.assignSite">
              <Form.Label>Assign Site(s)</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>Select Site...</option>
                <option value="School One">School One</option>
                <option value="School Two">School Two</option>
                <option value="School Three">School Three</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setIsOpen(false)}>
            Delete
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {showEditMasterTeacherAlert ? (
        <Alert variant="primary" className="alert-custom">
          {"Changed Maria Sanchez's status to inactive."}{' '}
          <Alert.Link href="/" className="alert-link-custom">
            UNDO
          </Alert.Link>
          <CloseButton
            className="alert-close-btn"
            onClick={() => setShowEditMasterTeacherAlert(false)}
          />
        </Alert>
      ) : null}
    </>
  );
};

EditMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default EditMasterTeacherModal;
