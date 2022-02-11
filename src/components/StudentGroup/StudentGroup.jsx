import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import './StudentGroup.css';

const convertDatetime = datetime => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const day = daysOfWeek[datetime.getDay()];
  const time = datetime.toLocaleTimeString('en-US');
  return `${day} ${time}`;
};

const StudentGroup = ({
  addressStreet,
  addressCity,
  addressState,
  addressZip,
  studentList,
  meetingTime,
}) => {
  return (
    <>
      <Card className="card">
        <div className="card-header">
          <h3 id="group-name">Area </h3>
          <BsThreeDots id="more-icon" />
        </div>
        <Card.Body className="card-body">
          <Card.Text>
            <div className="card-section">
              <Card.Title>Site Name</Card.Title>
              {addressStreet}, {addressCity} {addressState}
              <br />
              {addressZip}
            </div>
            <div className="card-section">
              <div className="students-section">
                <Card.Title id="students-header">
                  Students
                  <span id="num-students">{studentList.length}</span>
                </Card.Title>
              </div>
              {studentList.join(', ')}
            </div>
            <div className="card-section">
              <Card.Title>Meeting Time</Card.Title>
              {convertDatetime(new Date(meetingTime))}
            </div>
          </Card.Text>
          <Button variant="primary">Manage group</Button>
        </Card.Body>
      </Card>
    </>
  );
};

StudentGroup.defaultProps = {
  addressStreet: '123 Westview Way',
  addressCity: 'Irvine',
  addressState: 'CA',
  addressZip: '92617',
  studentList: ['Abby', 'Alyssa', 'Cal', 'Danny', 'Erica', 'Jared'],
  meetingTime: 'December 17, 1995 03:24:00',
};

StudentGroup.propTypes = {
  addressStreet: PropTypes.string,
  addressCity: PropTypes.string,
  addressState: PropTypes.string,
  addressZip: PropTypes.string,
  studentList: PropTypes.arrayOf(String),
  meetingTime: PropTypes.string,
};

export default StudentGroup;
