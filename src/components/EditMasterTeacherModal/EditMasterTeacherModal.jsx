import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton, Form, Badge } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './EditMasterTeacherModal.module.css';
import { TLPBackend, reloadPage } from '../../common/utils';
import WarningModal from '../WarningModal/WarningModal';

const EditMasterTeacherModal = ({ isOpen, setIsOpen, teacherId }) => {
  const [showEditMasterTeacherAlert, setShowEditMasterTeacherAlert] = useState(false);

  // const [email, setEmail] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  // This teacher data will be populated, but may be changed using the form
  const [teacherData, setTeacherData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  // Copy of initial teacher data for undo functionality
  // eslint-disable-next-line no-unused-vars
  const [initialTeacherData, setInitialTeacherData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    active: '',
    siteList: [],
  });
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState('');
  const [sites, setSites] = useState([]);
  const removeSite = e => {
    const name = e.target.getAttribute('name');
    setSites(sites.filter(site => site !== name));
  };
  const teacherName = `${teacherData.firstName} ${teacherData.lastName}`;
  // const teacherName = `${firstName} ${lastName}`;

  const [warningOpen, setWarningOpen] = useState(false);
  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowEditMasterTeacherAlert(true);
  };

  // const closeModalNoAlert = () => {
  //   setIsOpen(false);
  //   setShowEditMasterTeacherAlert(false);
  //   setErrorMessage('');
  // };

  const updateMasterTeacherData = async () => {
    const { firstName, lastName, phoneNumber, email } = teacherData;
    await TLPBackend.put(`/teachers/${teacherId}`, {
      firstName,
      lastName,
      phoneNumber,
      email,
      active: status.toLowerCase(),
    });
    reloadPage();
    closeModal();
  };

  // TODO: Get undo functionality working for MT edits
  // const undoChanges = async () => {
  //   try {
  //     const { firstName, lastName, phoneNumber, email, active } = initialTeacherData;
  //     await TLPBackend.put(`/teachers/${teacherId}`, {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       email,
  //       active,
  //     });
  //     setTeacherData({ firstName, lastName, email, phoneNumber });
  //     setStatus(active);
  //     setErrorMessage('');
  //     setShowEditMasterTeacherAlert(false);
  //   } catch (err) {
  //     setErrorMessage(err.message);
  //   }
  // };

  const schema = yup
    .object({
      firstName: yup.string().required('First name is required'),
      lastName: yup.string().required('Last name is required'),
      phoneNumber: yup.string().required('Phone number is required'),
    })
    .required();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const onSubmit = async data => {
    try {
      const { firstName, lastName, phoneNumber, email } = data;
      await TLPBackend.put(`/teachers/${teacherId}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        active: status.toLowerCase(),
      });
      // setTeacherData({ firstName, lastName, email, phoneNumber });
      setErrorMessage('');
      closeModal();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const deleteMasterTeacher = async () => {
    try {
      await TLPBackend.delete(`/teachers/${teacherId}`);
      // TODO: Don't reload page, add an alert for edited
      reloadPage();
      setIsOpen(false);
    } catch (err) {
      setErrorMessage(err.message);
      console.log(errorMessage);
    }
  };

  useEffect(async () => {
    if (!isOpen) return;

    try {
      const res = await TLPBackend.get(`/teachers/${teacherId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { firstName, lastName, phoneNumber, email, active } = res.data;
      setInitialTeacherData({ firstName, lastName, phoneNumber, email, siteList: sites });
      setTeacherData({ firstName, lastName, phoneNumber, email });
      setSites(res.data.sites);
      setStatus(active);
      reset({ firstName, lastName, email, phoneNumber });
      // const mtData = res.data;
      // setEmail(mtData.email);
      // setFirstName(mtData.firstName);
      // setLastName(mtData.lastName);
      // setPhoneNumber(mtData.phoneNumber);
      // setStatus(mtData.active);
    } catch (err) {
      setErrorMessage(err);
    }
  }, [isOpen]);

  return (
    <>
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={teacherName}
        body="teacher"
        deleteFunc={deleteMasterTeacher}
      />
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Teacher</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="first-name" className={styles.fNameField}>
                <h3 className={styles.requiredSubtitles}>First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  key={teacherData.firstName}
                  defaultValue={teacherData.firstName}
                  className={`form-control ${errors.firstName ? `is-invalid` : ''}`}
                  {...register('firstName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.firstName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
              <label htmlFor="last-name" className={styles.lNameField}>
                <h3 className={styles.requiredSubtitles}>Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  key={teacherData.lastName}
                  defaultValue={teacherData.lastName}
                  className={`form-control ${errors.lastName ? `is-invalid` : ''}`}
                  {...register('lastName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.lastName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
            </div>
            <div>
              <label htmlFor="email" className={styles.emailField}>
                <h3 className={styles.requiredSubtitles}>Email</h3>
                <input
                  disabled
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={teacherData.email}
                  className="form-control"
                />
              </label>
              <div>
                <label htmlFor="phone-number" className={styles.phoneNumField}>
                  <h3 className={styles.requiredSubtitles}>Phone Number</h3>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    key={teacherData.phoneNumber}
                    defaultValue={teacherData.phoneNumber}
                    className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                    {...register('phoneNumber')}
                  />
                </label>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.phoneNumber?.message ?? <>{'\u00A0'}</>}
                </div>
                {/* {JSON.stringify(errors)} */}
              </div>
              <label htmlFor="active" className={styles.emailField}>
                <h3 className={styles.requiredSubtitles}>Status</h3>
                <select
                  name="active"
                  className="form-control"
                  onChange={e => setStatus(e.target.value)}
                >
                  <option selected={status === 'active'} value="active">
                    Active
                  </option>
                  <option selected={status === 'inactive'} value="inactive">
                    Inactive
                  </option>
                </select>
                {status === 'inactive' ? (
                  <Form.Label id={styles['status-inactive-text']}>
                    *** If a teacher is made inactive, their assigned sites will be removed from
                    them.
                  </Form.Label>
                ) : null}
              </label>
              {/* TODO: Sites need to be populated and updated correctly */}
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
              <Form.Group className="mb-3" controlId="editTeacherAccount.notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control as="textarea" rows={3} />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" className={styles.button} onClick={openWarningModal}>
              Delete
            </Button>
            <Button variant="primary" className={styles.button} onClick={updateMasterTeacherData}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {showEditMasterTeacherAlert ? (
        <Alert variant="primary" className={styles['alert-custom']}>
          {`Updated ${teacherData.firstName} ${teacherData.lastName}'s information.`}{' '}
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
