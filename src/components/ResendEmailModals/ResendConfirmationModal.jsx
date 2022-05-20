import { React } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';
import { sendInviteLink, sendLoginLink } from '../../common/auth/auth_utils';
import { AUTH_ROLES } from '../../common/config';
import styles from './ResendModal.module.css';

const ResendConfirmationModal = ({ isOpen, setIsOpen, data, setAlertState }) => {
  const { position, email, firstName, lastName, phoneNumber } = data;

  const resendEmail = async () => {
    try {
      // admins get a new invite email
      if (position === AUTH_ROLES.ADMIN_ROLE) {
        await sendInviteLink(position, email, firstName, lastName, phoneNumber);
      }
      // master teachers get email to the website
      else {
        await sendLoginLink(email);
      }
      setAlertState({
        variant: 'success',
        message: `Invite Email successfully resent for ${firstName} ${lastName}`,
        open: true,
      });
    } catch (err) {
      setAlertState({
        variant: 'danger',
        // message: `Unable to resend email for ${name}`,
        message: err.message,
        open: true,
      });
    }
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className={`border-0 pb-0 ${styles.space}`} closeButton>
        <Modal.Title>Resend Email</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.space}>
        <p>
          Are you sure you want to resend a confirmation email to <strong>{email}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
        >
          Close
        </Button>
        <Button onClick={resendEmail}>Send Email</Button>
      </Modal.Footer>
    </Modal>
  );
};

ResendConfirmationModal.propTypes = {
  data: PropTypes.shape({
    position: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    active: PropTypes.string,
    expireTime: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setAlertState: PropTypes.func.isRequired,
};

export default ResendConfirmationModal;
