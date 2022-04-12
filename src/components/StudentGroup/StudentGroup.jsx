import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import styles from './StudentGroup.module.css';
import { parseTime } from '../../common/utils';

const StudentGroup = ({ groupName, studentList, meetingDay, meetingTime }) => {
  return (
    <>
      <Card className={styles.card}>
        <div className={styles['card-header']}>
          <h6 className={styles['group-name']}>{groupName}</h6>
        </div>
        <Card.Body className={styles['card-body']}>
          <div className={styles['card-section']}>
            <div className={styles['students-section']}>
              <Card.Title className={styles['students-header']}>
                Students
                <span className={styles['num-students']}>{studentList.length}</span>
              </Card.Title>
            </div>
            <div className={styles['student-names']}>{studentList.join(', ')}</div>
          </div>
          <div className={styles['card-section']}>
            <Card.Title>Meeting Time</Card.Title>
            <div>
              {meetingDay} {parseTime(meetingTime)}
            </div>
          </div>
          <Button className={styles['view-group-btn']} variant="primary">
            View group
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

StudentGroup.propTypes = {
  groupName: PropTypes.string.isRequired,
  studentList: PropTypes.arrayOf(String).isRequired,
  meetingDay: PropTypes.string.isRequired,
  meetingTime: PropTypes.string.isRequired,
};

export default StudentGroup;
