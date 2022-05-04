import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../common/vars.css';
import { Button, Col, Row } from 'react-bootstrap';
import styles from './StudentProfileBox.module.css';

const StudentProfileBox = ({ studentId, studentName }) => {
  // TODO: Add onclick for button to navigate to the student's profile page
  return (
    <Row className={styles['student-profile-row']}>
      <Col className="d-flex justify-content-center align-items-center">{studentName}</Col>
      <Col className="d-flex justify-content-center align-items-center">
        <Link to={`/student/${studentId}`}>
          <Button className={styles['view-profile-btn']}>View Profile</Button>
        </Link>
      </Col>
    </Row>
  );
};

StudentProfileBox.propTypes = {
  studentId: PropTypes.number.isRequired,
  studentName: PropTypes.string.isRequired,
};

export default StudentProfileBox;
