import React from 'react';
import { PropTypes } from 'prop-types';
import styles from './settings.module.css';
import AccountInformationView from './accountInformationView';

const TeacherView = ({ userInfo }) => {
  return (
    <div id={styles['mt-settings']}>
      <AccountInformationView userInfo={userInfo} />
      {/* TODO: Accessibility section */}
      {/* <Container className={styles['container-sect']}>
        <h3>Accessibility</h3>
        <Row>
          <Col md={{ offset: 1 }}>
            <h5>Text Size</h5>
            <p className={styles['section-val']}>Default Text Larger Text</p>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

TeacherView.defaultProps = {
  userInfo: {
    fullName: '',
    email: '',
    phoneNumber: '',
    status: '',
  },
};

TeacherView.propTypes = {
  userInfo: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    status: PropTypes.string,
  }),
};

export default TeacherView;
