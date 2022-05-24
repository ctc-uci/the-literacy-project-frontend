import { React, useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './EditAdminModal.module.css';
import { TLPBackend, reloadPage } from '../../common/utils';
import WarningModal from '../WarningModal/WarningModal';

const EditAdminModal = ({ isOpen, setIsOpen, adminId }) => {
  const [showEditAdminAlert, setShowEditAdminAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState(null);

  // This admin data will be populated, but may be changed using the form
  const [adminData, setAdminData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
  });
  // Copy of initial admin data for undo functionality
  const [initialAdminData, setInitialAdminData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    active: '',
  });
  const [status, setStatus] = useState('');
  const [warningOpen, setWarningOpen] = useState(false);
  const adminName = `${adminData.firstName} ${adminData.lastName}`;

  const closeModal = () => {
    setIsOpen(false);
    setShowEditAdminAlert(true);
  };

  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowEditAdminAlert(false);
    setErrorMessage('');
  };

  const openWarningModal = () => {
    setWarningOpen(!warningOpen);
  };

  const undoChanges = async () => {
    try {
      const { firstName, lastName, phoneNumber, email, active } = initialAdminData;
      await TLPBackend.put(`/admins/${adminId}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        active,
      });
      setAdminData({ firstName, lastName, email, phoneNumber });
      setStatus(active);
      setErrorMessage('');
      setShowEditAdminAlert(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

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
      await TLPBackend.put(`/admins/${adminId}`, {
        firstName,
        lastName,
        phoneNumber,
        email,
        active: status.toLowerCase(),
      });
      setAdminData({ firstName, lastName, email, phoneNumber });
      setErrorMessage('');
      closeModal();
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const deleteAdmin = async () => {
    // TODO: What to do if it fails ??? Need an error message
    try {
      await TLPBackend.delete(`/admins/${adminId}`);
      reloadPage();
      setIsOpen(false);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  useEffect(async () => {
    if (!isOpen) return;
    try {
      const res = await TLPBackend.get(`/admins/${adminId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        const { firstName, lastName, email, phoneNumber, active } = res.data;
        setInitialAdminData({ firstName, lastName, email, phoneNumber, active });
        setAdminData({ firstName, lastName, email, phoneNumber });
        setStatus(active);
        reset({ firstName, lastName, email, phoneNumber });
      } else {
        setError(error);
      }
    } catch (err) {
      setError(err);
    }
  }, [isOpen]);

  return (
    <>
      {/* Warning modal for deleting admin */}
      <WarningModal
        isOpen={warningOpen}
        setIsOpen={setWarningOpen}
        name={adminName}
        body="admin"
        deleteFunc={deleteAdmin}
      />
      {/* Actual modal for editing admin */}
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
                  key={adminData.firstName}
                  defaultValue={adminData.firstName}
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
                  key={adminData.lastName}
                  defaultValue={adminData.lastName}
                  className={`form-control ${errors.lastName ? `is-invalid` : ''}`}
                  {...register('lastName')}
                />
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.lastName?.message ?? <>{'\u00A0'}</>}
                </div>
              </label>
            </div>
            <label htmlFor="email" className={styles.emailField}>
              <h3 className={styles.requiredSubtitles}>Email</h3>
              <input
                disabled
                type="email"
                name="email"
                placeholder="Email"
                value={adminData.email}
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
                  key={adminData.phoneNumber}
                  defaultValue={adminData.phoneNumber}
                  className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                  {...register('phoneNumber')}
                />
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.phoneNumber?.message ?? <>{'\u00A0'}</>}
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="danger" onClick={openWarningModal}>
              Delete
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
          </Modal.Footer>
        </form>
      </Modal>

      {showEditAdminAlert ? (
        <Alert variant="primary" className="alert-custom">
          {`Updated ${adminData.firstName} ${adminData.lastName}'s information.`}{' '}
          <span
            aria-hidden
            className={`alert-link-custom underline ${styles.undoChanges}`}
            onClick={undoChanges}
          >
            UNDO
          </span>
          <CloseButton className="alert-close-btn" onClick={() => setShowEditAdminAlert(false)} />
        </Alert>
      ) : null}
    </>
  );
};

EditAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  adminId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default EditAdminModal;
