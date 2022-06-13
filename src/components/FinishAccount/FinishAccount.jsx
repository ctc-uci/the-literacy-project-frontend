import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { FaEye } from 'react-icons/fa';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import InformationPopover from '../Popover/InformationPopover';
import styles from './FinishAccount.module.css';
import logo from '../../assets/tlp.png';
import { finishAccountSetUp } from '../../common/auth/auth_utils';
import { ADMIN_USER_GUIDE } from '../../common/config';

const FinishAccount = ({ inviteId, data }) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const onSubmit = async newData => {
    finishAccountSetUp(
      newData.firstName,
      newData.lastName,
      newData.phoneNumber,
      inviteId,
      newData.newPassword,
    );
    setSuccess(!success);
  };

  const passwordRulesTooltipText =
    '\u2022 Must be at least 8 characters long' +
    '<br />' +
    '\u2022 Include at least one uppercase and lowercase letter' +
    '<br />' +
    '\u2022 Include at least 1 number' +
    '<br />' +
    '\u2022 Include one of these set of special characters [@$!%*?&]';

  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisibility = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const [reenterPasswordShown, setReenterPasswordShown] = useState(false);
  const toggleReenterPasswordVisibility = () => {
    setReenterPasswordShown(!reenterPasswordShown);
  };

  const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,255}$/;
  const passValidationSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    phoneNumber: Yup.string(),
    newPassword: Yup.string()
      .required('Please enter your new password')
      .matches(passwordRegExp, 'Password is invalid'),
    reenterNewPassword: Yup.string()
      .required('Please re-enter your new password')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match!'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors: errorsPass },
  } = useForm({
    resolver: yupResolver(passValidationSchema),
  });

  const goToLogin = () => {
    navigate('/login');
  };

  if (success) {
    return (
      <Container>
        <div className={styles['logo-wrapper']}>
          <img src={logo} alt={logo} className={styles.logo} />
        </div>
        <div className={styles['success-wrapper']}>
          <div className={styles.header}>Account Creation Successful</div>
          <div className={styles.body}>
            <p>
              You have successfully created your admin account. If you made a mistake in the
              previous page, you can change it in the settings page.
            </p>
            <p>
              <a
                href={ADMIN_USER_GUIDE}
                target="_blank"
                rel="noreferrer noopener"
                style={{ color: 'inherit', fontStyle: 'italic' }}
              >
                Here
              </a>{' '}
              is a helpful guide to help you navigate the site.
            </p>
          </div>
          <button
            className="btn"
            type="button"
            onClick={goToLogin}
            style={{
              backgroundColor: '#FFD350',
              color: 'var(--text-color-black)',
              width: '160px',
              marginTop: '20px',
            }}
          >
            Go to Dashboard
          </button>
        </div>
      </Container>
    );
  }
  return (
    <Container>
      <div className={styles['logo-wrapper']}>
        <img src={logo} alt={logo} className={styles.logo} />
      </div>
      <Col md={{ span: 8, offset: 2 }}>
        <form className={`form-group ${styles['site-form']}`} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-wrapper']}>
            <div className={styles['form-header']}>
              <h2 className={styles['form-title']}>Sign Up Confirmation</h2>
            </div>
            <div className={styles['welcome-wrapper']}>
              Welcome! Looks like this is your first time logging in. Please complete the sign up
              confirmation before using the site.
            </div>
            <h3 className={styles['optional-subtitles']}>Account Information</h3>
            <div className={styles['input-area']}>
              <Row>
                <Col md={3}>
                  <label className={styles.label} htmlFor="first-name">
                    First Name<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.firstName}
                      {...register('firstName')}
                    />
                  </label>
                </Col>
                <Col md={3}>
                  <label className={styles.label} htmlFor="last-name">
                    Last Name<span style={{ color: '#e32' }}>*</span>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={data.lastName}
                      {...register('lastName')}
                    />
                  </label>
                </Col>
              </Row>
              <Col md={5}>
                <label className={styles.label} htmlFor="email">
                  Email<span style={{ color: '#e32' }}>*</span>
                  <input
                    disabled="true"
                    type="text"
                    className="form-control"
                    defaultValue={data.email}
                  />
                </label>
              </Col>
              <Col md={5}>
                <label className={styles.label} htmlFor="Phone Number">
                  Phone Number
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={data.phoneNumber}
                    placeholder="(123) 456-7890"
                    {...register('phoneNumber')}
                  />
                </label>
              </Col>
            </div>
            <h3 className={styles['required-subtitles']}>Password</h3>
            <div className={styles['input-area']}>
              <Col mg={5}>
                <label className={styles.label} htmlFor="newPassword">
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
                      className={`form-control ${errorsPass.newPassword ? 'is-invalid' : ''} ${
                        styles['input-custom']
                      }`}
                      {...register('newPassword')}
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
                <label className={styles.label} htmlFor="reenterNewPassword">
                  Re-enter Password
                  <div className={styles['password-input']}>
                    <input
                      id="reenterNewPassword"
                      name="reenterNewPassword"
                      type={reenterPasswordShown ? 'text' : 'password'}
                      {...register('reenterNewPassword')}
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
              </Col>
            </div>
            <div className={styles.button}>
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#3288c4',
                  color: 'var(--text-color-white)',
                  width: '160px',
                  margin: '60px 0px 30px 70px',
                }}
              >
                <span style={{ fontSize: '18px' }}>Complete Sign Up</span>
              </button>
            </div>
          </div>
        </form>
      </Col>
    </Container>
  );
};

FinishAccount.propTypes = {
  inviteId: PropTypes.string.isRequired,
  data: PropTypes.arrayOf.isRequired,
};

export default FinishAccount;
