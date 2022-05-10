import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StatusCell.module.css';
import { sendInviteLink, sendLoginLink } from '../../common/auth/auth_utils';
import { AUTH_ROLES, USER_STATUS } from '../../common/config';
import ResendConfirmationModal from '../ResendEmailModals/ResendConfirmationModal';
import ResendEmailInputModal from '../ResendEmailModals/ResendEmailInputModal';

const StatusCell = ({ data, setEmail }) => {
  const status = data.active ? data.active : USER_STATUS.PENDING;
  const { position, email, firstName, lastName, phoneNumber } = data;
  const [wrongEmailModalOpen, setWrongEmailModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const resendEmail = async () => {
    // admins get a new invite email
    if (position === AUTH_ROLES.ADMIN_ROLE) {
      await sendInviteLink(position, email, firstName, lastName, phoneNumber);
    }
    // master teachers get email to the website
    else {
      await sendLoginLink(email);
    }
    setConfirmModalOpen(true);
  };

  if (status === USER_STATUS.PENDING) {
    return (
      <div style={{ fontWeight: 'bold' }}>
        <div style={{ color: 'var(--color-teal)' }}>Account Pending</div>
        <button
          type="button"
          className={styles['email-button']}
          onClick={resendEmail}
          style={{ color: 'var(--color-blue)' }}
        >
          Resend Email
        </button>
        <br />
        <button
          type="button"
          className={styles['email-button']}
          onClick={() => setWrongEmailModalOpen(true)}
          style={{ color: 'var(--color-light-red)' }}
        >
          Sent to the Wrong Email?
        </button>
        <ResendConfirmationModal
          isOpen={confirmModalOpen}
          setIsOpen={setConfirmModalOpen}
          position={position}
        />
        <ResendEmailInputModal
          isOpen={wrongEmailModalOpen}
          setIsOpen={setWrongEmailModalOpen}
          setEmail={setEmail}
          setConfirmModalOpen={setConfirmModalOpen}
          data={data}
        />
      </div>
    );
  }

  // temporary to display inactive since it's still an option
  if (status === USER_STATUS.INACTIVE) {
    return (
      <div style={{ fontWeight: 'bold' }}>
        <div>Inactive</div>
      </div>
    );
  }
  return (
    <div style={{ fontWeight: 'bold' }}>
      <div style={{ color: '#28a745' }}>Active</div>
    </div>
  );
};

StatusCell.propTypes = {
  data: PropTypes.shape({
    position: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    active: PropTypes.string,
    expireTime: PropTypes.string,
  }).isRequired,
  setEmail: PropTypes.func.isRequired,
};

export default StatusCell;
