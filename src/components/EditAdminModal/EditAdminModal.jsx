import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './EditAdminModal.module.css';
import { AUTH_ROLES } from '../../common/config';
import { TLPBackend, reloadPage } from '../../common/utils';
import { sendInviteLink } from '../../common/auth/auth_utils';
import WarningModal from '../WarningModal/WarningModal';

const EditAdminModal = ({ isOpen, setIsOpen, adminId }) => {
  const [showEditAdminAlert, setShowEditAdminAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [status, setStatus] = useState('');
  const [warningOpen, setWarningOpen] = useState(false);
  const adminName = `${firstName} ${lastName}`;

  // Email is disabled, so no need for verification?
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    delayError: 750,
  });

  const closeModal = () => {
    setIsOpen(false);
    setShowEditAdminAlert(true);
  };

  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowEditAdminAlert(false);
    setErrorMessage('');
  };

  // Dont need this anymore
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

  // ?
  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const onSubmit = async data => {
    try {
      await sendInviteLink(
        AUTH_ROLES.ADMIN_ROLE,
        data.email,
        data.firstName,
        data.lastName,
        data.phoneNumber,
      );
      setErrorMessage('');
      closeModal();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const deleteAdmin = async () => {
    // TODO: What to do if it fails ??? Need an error message
    await TLPBackend.delete(`/admins/${adminId}`);
    reloadPage();
    setIsOpen(false);
  };

  // Pre load data, is there another way of doing it?
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
      {/* Is this warning modal still needed */}
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={adminName}
        body="admin"
        deleteFunc={deleteAdmin}
      />
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModalNoAlert}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>Edit Admin</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <label htmlFor="first-name" className={styles.fNameField}>
                <h3 className={styles.requiredSubtitles}>First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  defaultValue={firstName}
                  className={`form-control ${errors.firstName ? `is-invalid` : ''}`}
                  {...register('firstName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.firstName?.message}
                </div>
              </label>
              <label htmlFor="last-name" className={styles.lNameField}>
                <h3 className={styles.requiredSubtitles}>Last Name</h3>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  defaultValue={lastName}
                  className={`form-control ${errors.lastName ? `is-invalid` : ''}`}
                  {...register('lastName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>{errors.lastName?.message}</div>
              </label>
            </div>
            <label htmlFor="email" className={styles.emailField}>
              <h3 className={styles.requiredSubtitles}>Email</h3>
              <input
                disabled
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={email}
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
                  defaultValue={phoneNumber}
                  className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                  {...register('phoneNumber')}
                />
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.phoneNumber?.message}
              </div>
              {/* {JSON.stringify(errors)} */}
            </div>
            <label htmlFor="active" className={styles.emailField}>
              <h3 className={styles.requiredSubtitles}>Status</h3>
              <select name="active" className="form-control">
                <option selected value="Active">
                  Active
                </option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={openWarningModal}>
              Delete
            </Button>
            <Button variant="primary" onClick={updateAdminData}>
              Save Changes
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
          </Modal.Footer>
        </form>
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
