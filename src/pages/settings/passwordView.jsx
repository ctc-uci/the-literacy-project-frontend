import React from 'react';
import { PropTypes } from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './settings.module.css';

const PasswordView = ({ userInfo }) => {
  const stateInfo = {
    userInfo,
    editAccountInfoDisplay: false,
    editPasswordDisplay: true,
  };

  return (
    <>
      <Container className={styles['container-sect']}>
        <h3>Password</h3>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>
              Current Password **********
              <Link
                id={styles['change-pwd-btn']}
                className="btn btn-warning"
                to="/settings/edit"
                state={stateInfo}
              >
                Change Password
              </Link>
            </h5>
          </Col>
        </Row>
      </Container>
    </>
  );
};

PasswordView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default PasswordView;
