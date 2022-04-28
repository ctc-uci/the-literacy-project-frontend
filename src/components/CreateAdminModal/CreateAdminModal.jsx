import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';

// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import styles from './CreateAdminModal.module.css';
// import { AUTH_ROLES } from '../../common/config';
// import { sendInviteLink } from '../../common/auth/auth_utils';

const schema = yup
  .object({
    email: yup.string().email().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phoneNumber: yup.string().required(),
  })
  .required();

const CreateAdminModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  // const [email, setEmail] = useState();
  // const [firstName, setFirstName] = useState();
  // const [lastName, setLastName] = useState();
  const [errorMessage, setErrorMessage] = useState();
  // const [phoneNumber, setPhoneNumber] = useState();

  const { register, handleSubmit } = useForm({
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
    // const formData = {};
    console.log(data);
    closeModal();
  };

  // const handleSubmit = async e => {
  //   try {
  //     e.preventDefault();
  //     setErrorMessage('');
  //     await sendInviteLink(AUTH_ROLES.ADMIN_ROLE, email, firstName, lastName, phoneNumber);
  //     setErrorMessage('');
  //     setEmail('');
  //     closeModal();
  //   } catch (err) {
  //     setErrorMessage(err.message);
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isOpen}
        onHide={closeModalNoAlert}
      >
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">Create Admin Account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <label htmlFor="first-name">
              First Name
              <input
                type="text"
                className="form-control"
                name="firstName"
                placeholder="First Name"
                {...register('firstName')}
              />
            </label>
            <label htmlFor="last-name">
              Last Name
              <input
                type="text"
                className="form-control"
                name="lastName"
                placeholder="Last Name"
                {...register('lastName')}
              />
            </label>
          </div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              {...register('email')}
            />
          </label>
          <div>
            <label htmlFor="phone-number">
              Phone Number
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register('phoneNumber')}
              />
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" className={styles.modalSave} type="submit">
            Send Email
          </Button>
          {errorMessage && <p>{errorMessage}</p>}
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="primary" className="alert-custom">
            Successfully created admin account!{' '}
            <CloseButton className="alert-close-btn" onClick={() => setShowAlert(false)} />
          </Alert>
        </div>
      ) : null}
    </form>
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
