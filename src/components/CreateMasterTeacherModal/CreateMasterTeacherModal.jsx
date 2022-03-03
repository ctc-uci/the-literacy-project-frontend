import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateMasterTeacherModal.css';
import { Modal, Button, Form } from 'react-bootstrap';
import ConfirmMasterTeacherModal from '../ConfirmMasterTeacherModal/ConfirmMasterTeacherModal';
import { TLPBackend } from '../../common/utils';

const CreateMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [firstName, setFirstName] = useState('');
  const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const sendEmailSuccessSequence = () => {
    TLPBackend.post('/teachers/create', {
      // eslint-disable-next-line object-shorthand
      firstName: firstName,
      lastName: 'temp',
      phoneNumber: '1234567890',
      email: 'email@test.com',
      title: 'Teacher',
    });
    setIsOpen(false);
    setConfirmModalOpen(true);
  };

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Teacher Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Form.Group className="mb-5" controlId="createTeacherAccount.firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createTeacherAccount.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createTeacherAccount.email" required="true">
              <Form.Label>
                <>
                  Email
                  <span id="asterisk">*</span>
                </>
              </Form.Label>
              <Form.Control type="email" placeholder="example@gmail.com" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createTeacherAccount.assignSite">
              <Form.Label>Assign Site(s)</Form.Label>
              <Form.Select aria-label="Default select example">
                <option>No School Selected</option>
                <option value="School One">School One</option>
                <option value="School Two">School Two</option>
                <option value="School Three">School Three</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={sendEmailSuccessSequence}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
      <ConfirmMasterTeacherModal isOpen={confirmModalIsOpen} setIsOpen={setConfirmModalOpen} />
    </>
  );
};

CreateMasterTeacherModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateMasterTeacherModal;
