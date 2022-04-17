import React from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styles from './settings.module.css';

const AdminView = ({ userInfo }) => {
  const { fullName, email, phoneNumber, status } = userInfo;

  return (
    <div id={styles['admin-settings']}>
      <Container className={styles['container-sect']}>
        <h3>
          Account Information <Button variant="warning">Edit</Button>
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
      <Container className={styles['container-sect']}>
        <h3>Password</h3>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>
              Current Password **********
              <Button variant="warning" id={styles['change-pwd-btn']}>
                Change Password
              </Button>
            </h5>
          </Col>
        </Row>
      </Container>
      <Container className={styles['container-sect']}>
        <h3>Accessibility</h3>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>Text Size</h5>
            <p className={styles['section-val']}>Default Text Larger Text</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

AdminView.defaultProps = {
  userInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    status: '',
  },
};

AdminView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default AdminView;
