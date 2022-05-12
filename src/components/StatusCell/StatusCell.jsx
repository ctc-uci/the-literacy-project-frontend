import { React, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './StatusCell.module.css';
import { USER_STATUS } from '../../common/config';
import ResendEmailInputModal from '../ResendEmailModals/ResendEmailInputModal';
import ResendConfirmationModal from '../ResendEmailModals/ResendConfirmationModal';

const StatusCell = ({ data, setEmail, setAlertState }) => {
  const status = data.active ? data.active : USER_STATUS.PENDING;
  const [wrongEmailModalOpen, setWrongEmailModalOpen] = useState(false);
  const [resendConfirmModalOpen, setResendConfirmModalOpen] = useState(false);

  if (status === USER_STATUS.PENDING) {
    return (
      <div style={{ fontWeight: 'bold' }}>
        <div style={{ color: 'var(--color-teal)' }}>Account Pending</div>
        <button
          type="button"
          className={styles['email-button']}
          onClick={() => setResendConfirmModalOpen(true)}
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
          isOpen={resendConfirmModalOpen}
          setIsOpen={setResendConfirmModalOpen}
          data={data}
          setAlertState={setAlertState}
        />
        <ResendEmailInputModal
          isOpen={wrongEmailModalOpen}
          setIsOpen={setWrongEmailModalOpen}
          setEmail={setEmail}
          data={data}
          setAlertState={setAlertState}
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
  setAlertState: PropTypes.func.isRequired,
};

export default StatusCell;
