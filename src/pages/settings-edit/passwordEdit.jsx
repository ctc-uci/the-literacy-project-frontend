import { React, useState } from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import styles from './settings-edit.module.css';
import { updateUserPassword } from '../../common/auth/auth_utils';
import InformationPopover from '../../components/Popover/InformationPopover';

const PasswordEditView = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const [currPasswordShown, setCurrPasswordShown] = useState(false);
  const toggleCurrPasswordVisibility = () => {
    setCurrPasswordShown(!currPasswordShown);
  };

  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const toggleReenterPasswordVisibility = () => {
    setReenterPasswordShown(!reenterPasswordShown);
  };

  const passwordRulesTooltipText =
    '\u2022 Must be at least 8 characters long' +
    '<br />' +
    '\u2022 Include at least one uppercase and lowercase letter' +
    '<br />' +
    '\u2022 Include at least 1 number' +
    '<br />' +
    '\u2022 Include one of these set of special characters [@$!%*?&]';
  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/;
  const passValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
      .required('Please enter your new password')
      .matches(passwordRegExp, 'Password is invalid'),
    reenterNewPassword: Yup.string()
      .required('Please re-enter your new password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match!'),
  });

  const onSubmitPass = async data => {
    try {
      await updateUserPassword(data.currentPassword, data.newPassword);
      navigate('/settings', { state: { infoUpdateSuccess: true } });
    } catch (err) {
      if (err.code === 'auth/wrong-password') {
        setErrorMessage('Password is incorrect');
      }
    }
  };

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass },
  } = useForm({
    resolver: yupResolver(passValidationSchema),
  });

  const cancelChanges = () => {
    navigate('/settings', { state: { infoUpdateSuccess: false } });
  };

  return (
    <div>
      <form key={2} onSubmit={handleSubmitPass(onSubmitPass)}>
        <Container>
          <h3>
            Password
            <Button variant="primary" className={styles['save-btn']} type="submit">
              Save Changes
            </Button>
            <Button type="submit" id={styles['cancel-btn']} onClick={cancelChanges}>
              Cancel
            </Button>
          </h3>
          <Row>
            <Col md={{ span: 5, offset: 1 }}>
              <div className="form-group">
                <label htmlFor="currentPassword">
                  Current Password
                  <div className={styles['password-input']}>
                    <input
                      id={styles['current-password-input']}
                      name="currentPassword"
                      type={currPasswordShown ? 'text' : 'password'}
                      {...registerPass('currentPassword')}
                      className={`form-control ${errorsPass.currentPassword ? 'is-invalid' : ''} ${
                        styles['input-custom']
                      }`}
                    />
                    <FaEye
                      className={styles['eye-icon']}
                      color="black"
                      onClick={toggleCurrPasswordVisibility}
                    />
                  </div>
                </label>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errorsPass.currentPassword?.message || errorMessage}
                </div>
                <Link to="/login/reset-password" id={styles['forgot-password-link']}>
                  Forgot Password?
                </Link>
              </div>
            </Col>
            <Col md={{ span: 5 }}>
              <div className="form-group">
                <label htmlFor="newPassword">
                  New Password
                  <span id={styles['password-rules']}>
                    <InformationPopover
                      bodyText={passwordRulesTooltipText}
                      header="Password Rules"
                    />
                  </span>
                  <div className={styles['password-input']}>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={newPasswordShown ? 'text' : 'password'}
                      {...registerPass('newPassword')}
                      className={`form-control ${errorsPass.newPassword ? 'is-invalid' : ''} ${
                        styles['input-custom']
                      }`}
                    />
                    <FaEye
                      className={styles['eye-icon']}
                      color="black"
                      onClick={toggleNewPasswordVisibility}
                    />
                  </div>
                </label>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errorsPass.newPassword?.message}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="reenterNewPassword">
                  Re-enter Password
                  <div className={styles['password-input']}>
                    <input
                      id="reenterNewPassword"
                      name="reenterNewPassword"
                      type={reenterPasswordShown ? 'text' : 'password'}
                      {...registerPass('reenterNewPassword')}
                      className={`form-control ${
                        errorsPass.reenterNewPassword ? 'is-invalid' : ''
                      } ${styles['input-custom']}`}
                    />
                    <FaEye
                      className={styles['eye-icon']}
                      color="black"
                      onClick={toggleReenterPasswordVisibility}
                    />
                  </div>
                </label>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errorsPass.reenterNewPassword?.message}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
    </div>
  );
};

export default PasswordEditView;
