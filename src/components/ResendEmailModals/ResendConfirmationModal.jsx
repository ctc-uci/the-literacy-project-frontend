import { React } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { capitalize } from '../../common/utils';
import styles from './ResendModal.module.css';

const ResendConfirmationModal = ({ position, isOpen, setIsOpen }) => {
  const positionTitle = capitalize(position);

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title style={{ margin: 'auto' }}>
          {positionTitle} Resend Email Confirmation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.body}>
        <p>
          Verification email has been resent. Once confirmed, the {positionTitle} will be in the
          system.
        </p>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ResendConfirmationModal.propTypes = {
  position: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ResendConfirmationModal;
