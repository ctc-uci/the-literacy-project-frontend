import React from 'react';
import PropTypes from 'prop-types';
import '../../common/vars.css';
import { Button, Col, Row } from 'react-bootstrap';
import styles from './StudentProfileBox.module.css';

const StudentProfileBox = ({ studentName }) => {
  // TODO: Add onclick for button to navigate to the student's profile page
  return (
    <Row className={styles['student-profile-row']}>
      <Col className="d-flex justify-content-center align-items-center">{studentName}</Col>
      <Col className="d-flex justify-content-center align-items-center">
        <Button className={styles['view-profile-btn']}>View Profile</Button>
      </Col>
    </Row>
  );
};

StudentProfileBox.defaultProps = {
  studentName: '',
};

StudentProfileBox.propTypes = {
  studentName: PropTypes.string,
};

export default StudentProfileBox;
