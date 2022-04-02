import { React } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './NotesModal.module.css';

const NotesModal = ({ isOpen, setIsOpen }) => {
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className={styles.title}>Notes</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.noteContainer}>
          <p className={styles.noteText}>Placeholder</p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

NotesModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default NotesModal;
