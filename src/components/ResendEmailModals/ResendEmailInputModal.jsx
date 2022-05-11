import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Modal, Button } from 'react-bootstrap';
import { AUTH_ROLES } from '../../common/config';
import { TLPBackend } from '../../common/utils';
import { sendInviteLink, sendLoginLink } from '../../common/auth/auth_utils';
import styles from './ResendModal.module.css';

const ResendEmailInputModal = ({ isOpen, setIsOpen, setEmail, setAlertState, data }) => {
  const { userId, inviteId, position, email, firstName, lastName, phoneNumber, notes } = data;
  const [errorMessage, setErrorMessage] = useState('');
  // used to update the email in the backend if necessary
  // admins use inviteId to query invite table, teachers use userId for TLP user table
  const id = position === AUTH_ROLES.ADMIN_ROLE ? inviteId : userId;

  const emailValidationSchema = Yup.object().shape({
    newEmail: Yup.string()
      .email('Invalid email format')
      .test('Same email', "This is the user's current email", value => value !== email)
      .required('An email is required.'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(emailValidationSchema),
  });

  const handleEmailInputSubmit = async info => {
    const { newEmail } = info;
    try {
      // update admin email in the invites table
      if (position === AUTH_ROLES.ADMIN_ROLE) {
        await sendInviteLink(position, newEmail, firstName, lastName, phoneNumber, notes, id);
      }
      // update email in TLP User table + firebase
      else {
        await TLPBackend.put(`/teachers/update-invite/${id}`, { email: newEmail });
        await sendLoginLink(newEmail);
      }
      reset({ newEmail: '' });
      setIsOpen(false);
      setAlertState({
        variant: 'success',
        message: `Successfully updated the email for ${firstName} ${lastName}`,
        open: true,
      });
      // eslint-disable-next-line no-param-reassign
      data.email = newEmail;
      setEmail(newEmail);
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  const closeModal = () => {
    reset({ newEmail: '' });
    setErrorMessage('');
    setIsOpen(false);
  };

  return (
    <Modal show={isOpen} onHide={closeModal} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title>Update Email</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit(handleEmailInputSubmit)}>
          <label style={{ width: '100%', padding: '1em 1em 0 1em' }} htmlFor="password">
            Please enter the new email for this user
            <div className={styles['password-input']}>
              <input
                type="text"
                {...register('newEmail')}
                className={`form-control ${errors.newEmail ? 'is-invalid' : ''}`}
                // onChange={() => setErrorMessage('')}
              />
            </div>
          </label>
          <div className={`text-danger ${styles['err-msg']}`}>
            {errors.newEmail?.message || errorMessage}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button onClick={closeModal} style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleEmailInputSubmit)}>Send New Email</Button>
      </Modal.Footer>
    </Modal>
  );
};

ResendEmailInputModal.propTypes = {
  setEmail: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setAlertState: PropTypes.func.isRequired,
  data: PropTypes.shape({
    position: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phoneNumber: PropTypes.string,
    userId: PropTypes.number,
    inviteId: PropTypes.string,
    notes: PropTypes.string,
  }).isRequired,
};

export default ResendEmailInputModal;
