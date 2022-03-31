import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import styles from './EditMasterTeacherModal.module.css';
import { TLPBackend } from '../../common/utils';

const EditMasterTeacherModal = ({ isOpen, setIsOpen, teacherId }) => {
  const [showEditMasterTeacherAlert, setShowEditMasterTeacherAlert] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');

  const [sites, setSites] = useState([]);
  const removeSite = e => {
    const name = e.target.getAttribute('name');
    setSites(sites.filter(site => site !== name));
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowEditMasterTeacherAlert(true);
  };

  const updateMasterTeacherData = async () => {
    await TLPBackend.put(`/teachers/${teacherId}`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      active: status.toLowerCase(),
    });
    closeModal();
  };

  const deleteMasterTeacher = async () => {
    await TLPBackend.delete(`/teachers/${teacherId}`);
    setIsOpen(false);
  };

  useEffect(async () => {
    const res = await TLPBackend.get(`/teachers/${teacherId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const mtData = res.data;
      setEmail(mtData.email);
      setFirstName(mtData.firstName);
      setLastName(mtData.lastName);
      setPhoneNumber(mtData.phoneNumber);
      setStatus(mtData.status);
    } else {
      setError(error);
    }
  }, []);

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
              <Form.Control
                placeholder="First Name"
                defaultValue={firstName}
                onChange={({ target }) => setFirstName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last Name"
                defaultValue={lastName}
                onChange={({ target }) => setLastName(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="example@gmail.com"
                defaultValue={email}
                onChange={({ target }) => setEmail(target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="editTeacherAccount.status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" onChange={({ target }) => setStatus(target.value)}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Form.Control>
              {status === 'Inactive' ? (
                <Form.Label id={styles['status-inactive-text']}>
                  *** If a teacher is made inactive, their assigned sites will be removed from them.
                </Form.Label>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="editTeacherAccount.assignSite">
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
                  if (target.value !== 'Select Site...' && !sites.includes(target.value)) {
                    setSites([...sites, target.value]);
                  }
                }}
              >
                <option>Select Site...</option>
                <option value="School One">School One</option>
                <option value="School Two">School Two</option>
                <option value="School Three">School Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group classname="mb-3" controlId="editTeacherAccount.notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteMasterTeacher}>
            Delete
          </Button>
          <Button variant="primary" onClick={updateMasterTeacherData}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {showEditMasterTeacherAlert ? (
        <Alert variant="primary" className={styles['alert-custom']}>
          {`Updated ${firstName} ${lastName}'s information.`}{' '}
          <Alert.Link href="/" className={styles['alert-link-custom']}>
            UNDO
          </Alert.Link>
          <CloseButton
            className={styles['alert-close-btn']}
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
  teacherId: PropTypes.number.isRequired,
};

export default EditMasterTeacherModal;
