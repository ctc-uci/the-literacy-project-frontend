import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import './CreateAdminModal.css';
import { Modal, Button, Form, Alert, CloseButton } from 'react-bootstrap';

const CreateAdminModal = ({ isOpen, setIsOpen }) => {
  const [showAlert, setShowAlert] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
    setShowAlert(true);
  };
  const closeModalNoAlert = () => {
    setIsOpen(false);
    setShowAlert(false);
  };

  return (
    <>
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
            <Form.Group className="mb-5" controlId="createAdmin.firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control placeholder="First Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAdmin.lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control placeholder="Last Name" />
            </Form.Group>
            <Form.Group className="mb-5" controlId="createAdminAccount.email" required="true">
              <Form.Label>
                <>
                  Email
                  <span id="asterisk">*</span>
                </>
              </Form.Label>
              <Form.Control type="email" placeholder="example@gmail.com" />
            </Form.Group>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" className="modalSave" onClick={closeModal}>
            Send Email
          </Button>
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
