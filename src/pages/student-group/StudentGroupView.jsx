import React from 'react';
import '../../common/vars.css';
import { Button, Container, Row, Card } from 'react-bootstrap';
import { BsPencil } from 'react-icons/bs';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import styles from './StudentGroupView.module.css';

const StudentGroupView = () => {
  const groupNum = 3;
  const siteName = 'Irvine';
  const siteAddress = 'address';
  const meetingTime = 'Monday 3:30PM';
  const studentGroupList = ['Abby Nguyen', 'Ava Jules', 'Kelly Lee', 'Maribel Chen'];
  return (
    <div>
      <NavigationBar />
      <div id={styles['page-container']}>
        <div id={styles['student-group-container']}>
          <div className={styles['header-section']}>
            <h2 className={styles['student-group-header']}>Student Group {groupNum}</h2>
            <Button variant="warning" className={styles['edit-group-btn']}>
              Edit Group <BsPencil />
            </Button>
          </div>
          <h5 className="--text-color-light-gray">{siteName} Site</h5>
          <h5 className="--text-color-light-gray">{siteAddress}</h5>
          <h3>Meeting Time</h3>
          <h5 className="--text-color-light-gray">{meetingTime}</h5>
          <h3>Students Assigned</h3>
          <Container fluid>
            {studentGroupList.map(student => {
              return (
                <Row key={student} className={styles['student-group-row']}>
                  <StudentProfileBox studentName={student} />
                </Row>
              );
            })}
          </Container>
        </div>
        <div id={styles['student-group-data-container']}>
          <h2>Over Group Data </h2>
          <p>Average Scores for Student Group C</p>
          {/* placeholder for graph */}
          <Card className={styles['student-group-graph']} />
          <Button className={styles['export-csv-btn']}> Export to CSV </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentGroupView;
