import { React, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';
import { TLPBackend } from '../../common/utils';
import { updateUserPassword } from '../../common/auth/auth_utils';
import InformationPopover from '../../components/Popover/InformationPopover';
import styles from './settings-edit.module.css';

const AdminSettingsEditView = ({ userInfo, userId }) => {
  const navigate = useNavigate();

  const { fullName, email, phoneNumber, status } = userInfo;
  let firstName = '';
  let lastName = '';
  if (fullName) {
    [firstName, lastName] = fullName.split(' ');
  }

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

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; // matches 10 digit phone numbers
  const accountInfoValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

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

  const updateAdminData = async data => {
    await TLPBackend.put(`/admins/${userId}`, data);
    navigate('/settings', { state: { infoUpdateSuccess: true } });
  };

  const onSubmit = data => {
    const formatData = data;
    formatData.phoneNumber = formatData.phoneNumber.replace(/[^a-zA-Z0-9]/g, '');
    formatData.email = email;
    formatData.active = status.toLowerCase();
    updateAdminData(formatData);
  };

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
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(accountInfoValidationSchema),
  });

  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass },
  } = useForm({
    resolver: yupResolver(passValidationSchema),
  });

  return (
    <div>
      <form key={1} onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <h3>
            Account Information
            <Button variant="primary" type="submit" className={styles['save-btn']}>
              Save
            </Button>
          </h3>
          <Row>
            <Col xs sm md={{ span: 6, offset: 1 }}>
              <div>
                <div className="form-group">
                  <h5>Full Name</h5>
                  <div id={styles['name-info']}>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      defaultValue={firstName}
                      {...register('firstName')}
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''} ${
                        styles['name-input']
                      }`}
                    />
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      defaultValue={lastName}
                      {...register('lastName')}
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''} ${
                        styles['name-input']
                      }`}
                    />
                  </div>
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.firstName?.message}
                  </div>
                  <div className={`text-danger ${styles['err-msg']}`}>
                    {errors.lastName?.message}
                  </div>
                </div>
              </div>
            </Col>
            <Col md={2} className="d-none d-md-block">
              <h5>Status</h5>
              <p
                style={{ color: status === 'Active' ? '#28A745' : '#6c757d' }}
                className={`${styles['section-val']} ${styles['status-val']}`}
              >
                {status}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1 }}>
              <div className="form-group">
                <h5 htmlFor="email">
                  Email
                  <input
                    id="email"
                    name="email"
                    type="text"
                    readOnly
                    value={email}
                    className={`form-control ${styles['input-custom']}`}
                  />
                </h5>
                <div className={`text-danger ${styles['err-msg']}`}>{errors.email?.message}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ offset: 1 }}>
              <div className="form-group">
                <h5 htmlFor="phoneNumber">
                  Phone Number
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    {...register('phoneNumber')}
                    className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''} ${
                      styles['input-custom']
                    }`}
                    defaultValue={phoneNumber}
                  />
                </h5>
                <div className={`text-danger ${styles['err-msg']}`}>
                  {errors.phoneNumber?.message}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </form>
      {/* Password Form */}
      <form key={2} onSubmit={handleSubmitPass(onSubmitPass)}>
        <Container>
          <h3>
            Password
            <Button variant="primary" className={styles['save-btn']} type="submit">
              Save Changes
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
      {/* TODO: Accessibility - default text or larger text section */}
    </div>
  );
};

AdminSettingsEditView.defaultProps = {
  userInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    status: '',
  },
  userId: null,
};

AdminSettingsEditView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }),
  userId: PropTypes.number,
};

export default AdminSettingsEditView;
