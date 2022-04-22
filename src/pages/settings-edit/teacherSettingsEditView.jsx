import { React } from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';
import styles from './settings-edit.module.css';

const TeacherSettingsEditView = ({ userInfo, userId }) => {
  const navigate = useNavigate();

  const { fullName, email, phoneNumber, status } = userInfo;
  let firstName = '';
  let lastName = '';
  if (fullName) {
    [firstName, lastName] = fullName.split(' ');
  }

  const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/; // matches 10 digit phone numbers

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(phoneRegExp, 'Phone number is not valid'),
  });

  const updateTeacherData = async data => {
    await TLPBackend.put(`/teachers/${userId}`, data);
    navigate('/settings', { state: { infoUpdateSuccess: true } });
  };

  const onSubmit = data => {
    const formatData = data;
    formatData.phoneNumber = formatData.phoneNumber.replace(/[^a-zA-Z0-9]/g, '');
    formatData.email = email;
    formatData.active = status.toLowerCase();
    updateTeacherData(formatData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <h3>
            Account Information{' '}
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
            <Col md={{ span: 4, offset: 1 }}>
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
                <div className="text-danger">{errors.email?.message}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 4, offset: 1 }}>
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
                <div className="text-danger">{errors.phoneNumber?.message}</div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* TODO: Accessibility - default text or larger text section */}
      </form>
    </div>
  );
};

TeacherSettingsEditView.defaultProps = {
  userInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    status: '',
  },
  userId: null,
};

TeacherSettingsEditView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }),
  userId: PropTypes.number,
};

export default TeacherSettingsEditView;
