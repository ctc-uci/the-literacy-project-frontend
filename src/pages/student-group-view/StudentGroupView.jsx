import { React } from 'react';
import '../../common/vars.css';
import { Button, Container, Card, Form } from 'react-bootstrap';
import { BsPencil, BsBackspace } from 'react-icons/bs';
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
      <div id={styles['header-container']}>
        <div className="d-flex">
          <div>
            <Button variant="link">
              <h3>
                <BsBackspace id={styles['backspace-icon']} />
                Return to {siteName} Site
              </h3>
            </Button>
          </div>
          <div className={styles['float-right-section']}>
            <h1>Student Group {groupNum}</h1>
          </div>
        </div>
        <div className={`d-flex ${styles['dropdown-container']}`}>
          <div className={`d-flex ${styles['float-right-section']}`}>
            <Form.Label className={styles['custom-form-label']}>
              <h4>School Year</h4>
            </Form.Label>
            <Form.Select className={styles['custom-form-select']}>
              <option>2021-22</option>
              <option>2022-23</option>
            </Form.Select>
            <Form.Label className={styles['custom-form-label']}>
              <h4>Cycle</h4>
            </Form.Label>
            <Form.Select className={styles['custom-form-select']}>
              <option>Cycle 1</option>
              <option>Cycle 2</option>
              <option>Cycle 3</option>
              <option>Cycle 4</option>
            </Form.Select>
          </div>
        </div>
      </div>
      <div id={styles['page-container']}>
        <div id={styles['student-group-container']}>
          <div className={styles['header-section']}>
            <h2 className={styles['student-group-header']}>Student Group {groupNum}</h2>
            <Button variant="warning" className={styles['edit-group-btn']}>
              Edit Group <BsPencil />
            </Button>
          </div>
          <div id={styles['site-info-section']}>
            <h5 className={styles['grey-text']}>{siteName} Site</h5>
            <h5 className={styles['grey-text']}>{siteAddress}</h5>
          </div>
          <div id={styles['meeting-time-section']}>
            <h3 className={styles['section-header']}>Meeting Time</h3>
            <h5 className={styles['grey-text']}>{meetingTime}</h5>
          </div>
          <div id={styles['students-assigned-section']}>
            <h3 className={styles['section-header']}>Students Assigned</h3>
            <Container fluid>
              {studentGroupList.map(student => {
                return <StudentProfileBox key={student} studentName={student} />;
              })}
            </Container>
          </div>
        </div>
        <div id={styles['student-group-data-container']}>
          <h2>Overall Group Data </h2>
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
