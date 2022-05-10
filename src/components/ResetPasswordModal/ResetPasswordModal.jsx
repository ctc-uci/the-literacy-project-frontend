import { React, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './ResetPasswordModal.module.css';
import InformationPopover from '../Popover/InformationPopover';
import { TLPBackend, passwordRulesTooltipText, passwordRegExp } from '../../common/utils';

const ResetPasswordModal = ({ userId, isOpen, setIsOpen }) => {
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [checkPasswordShown, setCheckPasswordShown] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const passValidationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Please enter your new password')
      .matches(passwordRegExp, 'Password does not meet requirements'),
    checkPassword: Yup.string()
      .required('Please re-enter your new password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match!'),
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass },
  } = useForm({
    resolver: yupResolver(passValidationSchema),
  });

  const handleSubmit = async data => {
    try {
      // given user id, find the firebase id in the backend to change the password
      await TLPBackend.post(`/teachers/reset-password/${userId}`, {
        newPassword: data.newPassword,
      });
      setIsOpen(false);
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
      <Modal.Header className="border-0 pb-0" closeButton>
        <Modal.Title className={styles.title}>Reset Password</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmitPass(handleSubmit)}>
          <label className={styles['log-label']} htmlFor="password">
            New Password{' '}
            <span className={styles['password-popover']}>
              <InformationPopover bodyText={passwordRulesTooltipText} header="Password Rules" />
            </span>
            <div className={styles['password-input']}>
              <input
                type={newPasswordShown ? 'text' : 'password'}
                {...registerPass('newPassword')}
                className={`form-control ${errorsPass.newPassword ? 'is-invalid' : ''}${
                  styles['input-custom']
                }`}
              />
              <FaEye
                className={styles['eye-icon']}
                color="black"
                onClick={() => setNewPasswordShown(!newPasswordShown)}
              />
            </div>
          </label>
          <div className={`text-danger ${styles['err-msg']}`}>
            {errorsPass.newPassword?.message || errorMessage}
          </div>

          <label className={styles['log-label']} htmlFor="password">
            Re-enter Password
            <div className={styles['password-input']}>
              <input
                type={checkPasswordShown ? 'text' : 'password'}
                {...registerPass('checkPassword')}
                className={`form-control ${errorsPass.checkPassword ? 'is-invalid' : ''}${
                  styles['input-custom']
                }`}
              />
              <FaEye
                className={styles['eye-icon']}
                color="black"
                onClick={() => setCheckPasswordShown(!checkPasswordShown)}
              />
            </div>
          </label>
          <div className={`text-danger ${styles['err-msg']}`}>
            {errorsPass.checkPassword?.message || errorMessage}
          </div>
        </form>
      </Modal.Body>

      <Modal.Footer className="border-0">
        <Button
          onClick={() => setIsOpen(false)}
          style={{ backgroundColor: 'var(--color-gray-blue-muted)' }}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmitPass(handleSubmit)}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

ResetPasswordModal.propTypes = {
  userId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
