import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './CreateAdminModal.module.css';
import { AUTH_ROLES } from '../../common/config';
import { sendInviteLink } from '../../common/auth/auth_utils';

const CreateAdminModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const schema = yup
    .object({
      email: yup
        .string()
        .email('Email must be a valid email address')
        .required('Email is required'),
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
    setShowAlert(true);
  };

  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowAlert(false);
    setErrorMessage('');
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

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModalNoAlert}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title className={styles.modalTitle}>Create Admin Account</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <label htmlFor="first-name" className={styles.fNameField}>
                <h3 className={styles.requiredSubtitles}>First Name</h3>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
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
                  placeholder="Last Name"
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
                type="email"
                name="email"
                placeholder="Email"
                className={`form-control ${errors.email ? `is-invalid` : ''}`}
                {...register('email')}
              />
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.email?.message ?? <>{'\u00A0'}</>}
              </div>
            </label>
            <div>
              <label htmlFor="phone-number" className={styles.phoneNumField}>
                <h3 className={styles.requiredSubtitles}>Phone Number</h3>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className={`form-control ${errors.phoneNumber ? `is-invalid` : ''}`}
                  {...register('phoneNumber')}
                />
              </label>
              <div className={`text-danger ${styles['err-msg']}`}>
                {errors.phoneNumber?.message ?? <>{'\u00A0'}</>}
              </div>
              {/* {JSON.stringify(errors)} */}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" className={styles.modalSave} type="submit">
              Send Email
            </Button>
            {errorMessage && <p>{errorMessage}</p>}
          </Modal.Footer>
        </form>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="primary" className="alert-custom">
            Successfully created admin account!{' '}
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </>
  );

  // return isOpen ? (
  //   <>
  //     <div className="create-admin-modal">
  //       <div className="create-admin-modal-top-bar">
  //         {/* create the title and the x button
  //         (clicking the x button should set something to false so that the modal doesn't show) */}
  //         <div className="create-admin-modal-top-bar-title">Create Admin Account</div>
  //         <div className="create-admin-modal-exit-button">
  //           <button
  //             type="button"
  //             className="create-admin-modal-exit-button"
  //             onClick={() => {
  //               setIsOpen(false);
  //             }}
  //           >
  //             X
  //           </button>
  //         </div>
  //       </div>
  //       <div className="create-admin-modal-body">
  //         {/* create the form */}
  //         <div className="create-admin-modal-field-desc">Email</div>
  //         <input
  //           className="modal-text-input"
  //           type="text"
  //           defaultValue={email}
  //           onChange={e => setEmail(e.target.value)}
  //         />
  //       </div>
  //       <div className="create-admin-modal-bottom-bar">
  //         {/* create the save + add another / save buttons */}
  //         {/* change save function later */}
  //         <button
  //           type="button"
  //           className="create-admin-modal-send-another-button"
  //           onClick={() => {
  //             setIsOpen(false);
  //           }}
  //         >
  //           Save and Create Another
  //         </button>
  //         <button
  //           type="button"
  //           className="create-admin-modal-save-button"
  //           onClick={() => {
  //             setIsOpen(false);
  //           }}
  //         >
  //           Send Email
  //         </button>
  //       </div>
  //     </div>
  //   </>
  // ) : null;
};

CreateAdminModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default CreateAdminModal;
