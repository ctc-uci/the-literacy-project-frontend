import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton, Form } from 'react-bootstrap';
import { TLPBackend, reloadPage } from '../../common/utils';
import WarningModal from '../WarningModal/WarningModal';

const EditAdminModal = ({ isOpen, setIsOpen, adminId }) => {
  const [showEditAdminAlert, setShowEditAdminAlert] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [warningOpen, setWarningOpen] = useState(false);
  const adminName = `${firstName} ${lastName}`;

  const closeModal = () => {
    setIsOpen(false);
    setShowEditAdminAlert(true);
  };

  const updateAdminData = async () => {
    await TLPBackend.put(`/admins/${adminId}`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      active: status.toLowerCase(),
    });
    reloadPage();
    closeModal();
  };

  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const deleteAdmin = async () => {
    // TODO: What to do if it fails ??? Need an error message
    await TLPBackend.delete(`/admins/${adminId}`);
    reloadPage();
    setIsOpen(false);
  };

  useEffect(async () => {
    const res = await TLPBackend.get(`/admins/${adminId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const adminData = res.data;
      setEmail(adminData.email);
      setFirstName(adminData.firstName);
      setLastName(adminData.lastName);
      setPhoneNumber(adminData.phoneNumber);
      setStatus(adminData.active);
    } else {
      setError(error);
    }
  }, []);
  return (
    <>
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={adminName}
        body="admin"
        deleteFunc={deleteAdmin}
      />
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Form.Group className="mb-5" controlId="editAdminAccount.firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                defaultValue={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editAdminAccount.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                defaultValue={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editAdminAccount.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                defaultValue={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editAdminAccount.status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" onChange={({ target }) => setStatus(target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={openWarningModal}>
            Delete
          </Button>
          <Button variant="primary" onClick={updateAdminData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {showEditAdminAlert ? (
        <Alert variant="primary" className="alert-custom">
          {`Updated ${firstName} ${lastName}'s information.`}{' '}
          <Alert.Link href="/" className="alert-link-custom">
            UNDO
          </Alert.Link>
          <CloseButton className="alert-close-btn" onClick={() => setShowEditAdminAlert(false)} />
        </Alert>
      ) : null}
    </>
  );
};

EditAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  adminId: PropTypes.number.isRequired,
};

export default EditAdminModal;
