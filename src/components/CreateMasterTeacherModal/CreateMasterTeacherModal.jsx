import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import styles from './CreateMasterTeacherModal.module.css';
import ConfirmMasterTeacherModal from '../ConfirmMasterTeacherModal/ConfirmMasterTeacherModal';
import { AUTH_ROLES } from '../../common/config';
import { sendInviteLink } from '../../common/auth/auth_utils';
import { reloadPage } from '../../common/utils';

const CreateMasterTeacherModal = ({ isOpen, setIsOpen }) => {
  const [confirmModalIsOpen, setConfirmModalOpen] = useState(false);
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [phoneNumber, setPhoneNumber] = useState();

  const [sites, setSites] = useState([]);
  const removeSite = e => {
    const name = e.target.getAttribute('name');
    setSites(sites.filter(site => site !== name));
  };

  const closeModal = () => setIsOpen(false);

  const sendEmailSuccessSequence = () => {
    setIsOpen(false);
    setConfirmModalOpen(true);
  };

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      await sendInviteLink(AUTH_ROLES.USER_ROLE, email, firstName, lastName, phoneNumber);
      setErrorMessage('');
      setEmail('');
      sendEmailSuccessSequence();
      reloadPage();
    } catch (err) {
      setErrorMessage(err.message);
    }
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
                onChange={({ target }) => setFirstName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createTeacherAccount.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                onChange={({ target }) => setLastName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAdmin.phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                placeholder="Phone Number"
                onChange={({ target }) => setPhoneNumber(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createTeacherAccount.email" required="true">
              <Form.Label>
                <>
                  Email
                  <span id="asterisk">*</span>
                </>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="createTeacherAccount.assignSite">
              <Form.Label>Assign Site(s)</Form.Label>
              <div>
                {sites.map(site => {
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <Badge bg="secondary" className={styles['site-badge']}>
                      <BsX cursor="pointer" name={site} onClick={removeSite} /> {site}
                    </Badge>
                  );
                })}
              </div>
              <Form.Select
                onChange={({ target }) => {
                  if (target.value !== 'No School Selected' && !sites.includes(target.value)) {
                    setSites([...sites, target.value]);
                  }
                }}
              >
                <option>No School Selected</option>
                <option value="School One">School One</option>
                <option value="School Two">School Two</option>
                <option value="School Three">School Three</option>
              </Form.Select>
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Send Email
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
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
