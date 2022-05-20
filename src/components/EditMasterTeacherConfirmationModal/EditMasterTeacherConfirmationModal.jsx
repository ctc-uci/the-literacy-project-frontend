// import { React, useState } from 'react';
import { React } from 'react';
import { PropTypes } from 'prop-types';
// import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import styles from './EditMasterTeacherConfirmationModal.module.css';

const EditMasterTeacherConfirmationModal = ({ isOpen, setIsOpen, name, onSubmitFunc }) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  // const deleteCloseModal = () => {
  //   setIsOpen(false);
  //   setShowAlert(true);
  // };

  // const bodies = {
  //   site: (
  //     <p>
  //       The site and students in it will no longer be available after deletion.{' '}
  //       <span className={styles.undo}>You cannot undo this</span>. If you want to keep the sites,
  //       you can choose to make this site <span className={styles.bold}>inactive</span> instead.
  //     </p>
  //   ),
  //   area: (
  //     <p>
  //       The area, sites and students in it will no longer be available after deletion.{' '}
  //       <span className={styles.undo}>You cannot undo this</span>. If you want to keep the area and
  //       sites in it, you can choose to make this area <span className={styles.bold}>inactive</span>{' '}
  //       instead.
  //     </p>
  //   ),
  //   admin: (
  //     <p>
  //       The admin will no longer be available after deletion.{' '}
  //       <span className={styles.undo}>You cannot undo this</span>. Did you want to edit this
  //       instead?
  //     </p>
  //   ),
  //   teacher: (
  //     <p>
  //       The teacher will no longer be available after deletion.{' '}
  //       <span className={styles.undo}>You cannot undo this</span>. If you want to keep the teacher,
  //       you can choose to make them <span className={styles.bold}>inactive</span> instead.
  //     </p>
  //   ),
  //   student: (
  //     <p>
  //       The student will no longer be available after deletion.{' '}
  //       <span className={styles.undo}>You cannot undo this</span>. Did you want to edit this
  //       instead?
  //     </p>
  //   ),
  //   studentGroup: (
  //     <div>
  //       <p>
  //         The student group information will no longer be available after this deletion.*
  //         <span className={styles.undo}>You cannot undo this</span>.
  //       </p>
  //       <p>*You can still access the students in this group after deletion.</p>
  //     </div>
  //   ),
  // };

  return (
    <>
      <Modal
        className={styles.modal}
        dialogClassName={styles.dialog}
        show={isOpen}
        onHide={closeModal}
      >
        <Modal.Header className={styles['modal-header']} closeButton>
          <Modal.Title className={styles['modal-title']}>Changed Sites Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <span className={styles.bold}>
              You have changed the following site assignments for {name} as follows:
            </span>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.buttons} variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button className={styles.buttons} variant="primary" onClick={onSubmitFunc}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* {showAlert ? (
        <div className="center-block">
          <Alert variant="success" className={styles['alert-custom']}>
            Successfully deleted {name}.{' '}
            <CloseButton
              className={styles['alert-close-btn']}
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        </div>
      ) : null} */}
    </>
  );
};

EditMasterTeacherConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onSubmitFunc: PropTypes.func.isRequired,
};

export default EditMasterTeacherConfirmationModal;
