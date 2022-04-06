import React from 'react';
import PropTypes from 'prop-types';
import '../../common/vars.css';
import { Button, Col } from 'react-bootstrap';
import styles from './StudentProfileBox.module.css';

const StudentProfileBox = ({ studentName }) => {
  return (
    <>
      <Col className="d-flex justify-content-center align-items-center">{studentName}</Col>
      <Col className="d-flex justify-content-center align-items-center">
        <Button className={styles['view-profile-btn']}>View Profile</Button>
      </Col>
    </>
  );
};

StudentProfileBox.defaultProps = {
  studentName: '',
};

StudentProfileBox.propTypes = {
  studentName: PropTypes.string,
};

export default StudentProfileBox;
