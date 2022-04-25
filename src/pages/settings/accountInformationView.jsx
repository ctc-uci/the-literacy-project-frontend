import React from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './settings.module.css';

const AccountInformationView = ({ userInfo }) => {
  const { fullName, email, phoneNumber, status } = userInfo;
  const stateInfo = {
    userInfo: {
      fullName,
      email,
      phoneNumber,
      status,
    },
    editAccountInfoDisplay: true,
    editPasswordDisplay: false,
  };

  return (
    <>
      <Container className={styles['container-sect']}>
        <h3>
          Account Information{' '}
          <Link className="btn btn-warning" to="/settings/edit" state={stateInfo}>
            Edit
          </Link>
        </h3>
        <Row>
          <Col xs sm md={{ span: 5, offset: 1 }}>
            <h5>Name</h5>
            <p className={styles['section-val']}>{fullName}</p>
          </Col>
          <Col md={5} className="d-none d-md-block">
            <h5>Status</h5>
            <p
              style={{ color: status === 'Active' ? '#28A745' : '#6c757d' }}
              className={`${styles['section-val']} ${styles['mt-status']}`}
            >
              {status}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>Email</h5>
            <p className={styles['section-val']}>{email}</p>
          </Col>
        </Row>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>Phone Number</h5>
            <p className={styles['section-val']}>{phoneNumber}</p>
          </Col>
        </Row>
        <Row className="d-block d-sm-block d-md-none">
          <Col>
            <h5>Status</h5>
            <p
              style={{ color: status === 'Active' ? '#28A745' : '#6c757d' }}
              className={`${styles['section-val']} ${styles['mt-status']}`}
            >
              {status}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

AccountInformationView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default AccountInformationView;
