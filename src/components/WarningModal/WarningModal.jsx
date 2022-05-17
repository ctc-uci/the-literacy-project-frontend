import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Modal, Button, Alert, CloseButton } from 'react-bootstrap';
import styles from './WarningModal.module.css';

const WarningModal = ({ isOpen, setIsOpen, name, body, deleteFunc }) => {
  const [showAlert, setShowAlert] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteCloseModal = () => {
    setIsOpen(false);
    setShowAlert(true);
    deleteFunc();
  };

  const bodies = {
    site: (
      <p>
        The site and students in it will no longer be available after deletion.{' '}
        <span className={styles.undo}>You cannot undo this</span>. If you want to keep the sites,
        you can choose to make this site <span className={styles.bold}>inactive</span> instead.
      </p>
    ),
    area: (
      <p>
        The area, sites and students in it will no longer be available after deletion.{' '}
        <span className={styles.undo}>You cannot undo this</span>. If you want to keep the area and
        sites in it, you can choose to make this area <span className={styles.bold}>inactive</span>{' '}
        instead.
      </p>
    ),
    admin: (
      <p>
        The admin will no longer be available after deletion.{' '}
        <span className={styles.undo}>You cannot undo this</span>. Did you want to edit this
        instead?
      </p>
    ),
    teacher: (
      <p>
        The teacher will no longer be available after deletion.{' '}
        <span className={styles.undo}>You cannot undo this</span>. If you want to keep the teacher,
        you can choose to make them <span className={styles.bold}>inactive</span> instead.
      </p>
    ),
    student: (
      <p>
        The student will no longer be available after deletion.{' '}
        <span className={styles.undo}>You cannot undo this</span>. Did you want to edit this
        instead?
      </p>
    ),
    studentGroup: (
      <div>
        <p>
          The student group information will no longer be available after this deletion.*
          <span className={styles.undo}>You cannot undo this</span>.
        </p>
        <p>*You can still access the students in this group after deletion.</p>
      </div>
    ),
  };

  return (
    <>
      <Modal
        className={styles.modal}
        dialogClassName={styles.dialog}
        show={isOpen}
        onHide={closeModal}
      >
        <Modal.Header className={styles['modal-header']} closeButton>
          <Modal.Title className={styles['modal-title']}>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete <span className={styles.bold}>{name}</span>?
          </p>
          {bodies[body]}
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.buttons} variant="primary" onClick={closeModal}>
            Cancel
          </Button>
          <Button className={styles.buttons} variant="danger" onClick={deleteCloseModal}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {showAlert ? (
        <div className="center-block">
          <Alert variant="danger" className={styles['alert-custom']}>
            Successfully deleted {name}.{' '}
            <CloseButton
              className={styles['alert-close-btn']}
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        </div>
      ) : null}
    </>
  );
};

WarningModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deleteFunc: PropTypes.func.isRequired,
};

export default WarningModal;
