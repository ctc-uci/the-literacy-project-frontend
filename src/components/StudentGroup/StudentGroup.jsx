import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import styles from './StudentGroup.module.css';
import { parseTime } from '../../common/utils';

const StudentGroup = ({
  groupId,
  groupName,
  studentList,
  meetingDay,
  meetingTime,
  viewAddress = false,
  siteName = '',
  address = '',
}) => {
  return (
    <>
      <Card className={styles.card}>
        <div className={styles['card-header']}>
          <h6 className={styles['group-name']}>{groupName}</h6>
        </div>
        <Card.Body className={styles['card-body']}>
          <div className={styles['body-content']}>
            {viewAddress && (
              <div className={styles['card-section']}>
                <Card.Title>{siteName}</Card.Title>
                <div>{address}</div>
              </div>
            )}
            <div className={styles['card-section']}>
              <div className={styles['students-section']}>
                <Card.Title className={styles['students-header']}>Students</Card.Title>
              </div>
              <div className={styles['student-names']}>{studentList.join(', ')}</div>
            </div>
            <div className={styles['card-section']}>
              <Card.Title>Meeting Time</Card.Title>
              <div>
                {meetingDay} {parseTime(meetingTime)}
              </div>
            </div>
            <Link to={`/student-groups/${groupId}`}>
              <Button className={styles['view-group-btn']} variant="primary">
                View group
              </Button>
            </Link>
          </div>
          <div className={styles['body-content']}>
            <h5 className={styles['num-students']}>{studentList.length}</h5>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

StudentGroup.propTypes = {
  groupId: PropTypes.number.isRequired,
  groupName: PropTypes.string.isRequired,
  studentList: PropTypes.arrayOf(String).isRequired,
  meetingDay: PropTypes.string.isRequired,
  meetingTime: PropTypes.string.isRequired,
  viewAddress: PropTypes.bool.isRequired,
  siteName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default StudentGroup;
