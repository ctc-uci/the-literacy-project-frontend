import { React, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../common/vars.css';
import { Button, Container, Form } from 'react-bootstrap';
import { BsPencil, BsBackspace } from 'react-icons/bs';
import { TLPBackend, parseTime, calculateScores } from '../../common/utils';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import Graph from '../../components/Graph/Graph';
import styles from './student-group-view.module.css';
import Footer from '../../components/Footer/Footer';
import EditStudentGroupModal from '../../components/EditStudentGroupModal/EditStudentGroupModal';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const StudentGroupView = () => {
  const studentGroupId = useParams().groupId;
  const [siteId, setSiteId] = useState();
  const [masterTeacherId, setMasterTeacherId] = useState();
  const [siteName, setSiteName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [meetingTime, setMeetingTime] = useState('');
  const [studentGroupList, setStudentGroupList] = useState([]);
  const [testScores, setTestScores] = useState({});
  const [error, setError] = useState(null);
  const [editStudentGroupIsOpen, setEditStudentGroupIsOpen] = useState(false);
  const schoolYears = ['2021-2022', '2022-2023', '2023-2024'];
  const [schoolYear, setSchoolYear] = useState();
  const schoolCycles = [1, 2, 3, 4];
  const [schoolCycle, setSchoolCycle] = useState();
  const dropdownDisabled = true;

  const getStudentFirstNames = students => {
    const studentList = [];
    if (students) {
      students.forEach(s => studentList.push(`${s.firstName} ${s.lastName}`));
    }
    return studentList;
  };

  useEffect(async () => {
    const studentGroupRes = await TLPBackend.get(`/student-groups/${studentGroupId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (studentGroupRes.status === 200) {
      console.log('studentgroupres', studentGroupRes);
      setSiteId(studentGroupRes.data.siteId);
      setMeetingTime(
        `${studentGroupRes.data.meetingDay} ${parseTime(studentGroupRes.data.meetingTime)}`,
      );
      setStudentGroupList(getStudentFirstNames(studentGroupRes.data.students));
      setMasterTeacherId(studentGroupRes.data.masterTeacherId);
      setSchoolYear(`${studentGroupRes.data.year}-${studentGroupRes.data.year + 1}`);
      setSchoolCycle(studentGroupRes.data.cycle);
    } else {
      setSiteId(-1);
      setError(error);
    }

    const sitesRes = await TLPBackend.get(`/sites/${siteId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (sitesRes.status === 200) {
      setSiteName(sitesRes.data.siteName);
      setSiteAddress(
        `${sitesRes.data.addressStreet},  ${sitesRes.data.addressCity} ${sitesRes.data.addressZip}`,
      );
    } else {
      setSiteName('');
      setError(error);
    }

    const studentsRes = await TLPBackend.get(`/students/student-group/${studentGroupId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (studentsRes.status === 200) {
      setTestScores(calculateScores(studentsRes.data));
    } else {
      setTestScores({});
      setError(error);
    }
  }, [siteId]);

  return (
    <div>
      <div id={styles['header-container']}>
        <div className="d-flex">
          <div>
            <Link to="/">
              <Button variant="link">
                <h3>
                  <BsBackspace id={styles['backspace-icon']} />
                  Return to {siteName} Site
                </h3>
              </Button>
            </Link>
          </div>
          <div className={styles['float-right-section']}>
            <h1>Student Group {studentGroupId}</h1>
          </div>
        </div>
        <div className={`d-flex ${styles['dropdown-container']}`}>
          <div className={`d-flex ${styles['float-right-section']}`}>
            <Form.Label className={styles['custom-form-label']}>
              <h4>School Year</h4>
            </Form.Label>
            {typeof schoolYear === 'string' ? (
              <DropdownMenu
                choices={schoolYears}
                current={schoolYear}
                setFn={setSchoolYear}
                disabled={dropdownDisabled}
              />
            ) : null}
            <Form.Label className={styles['custom-form-label']}>
              <h4>Cycle</h4>
            </Form.Label>
            {typeof schoolCycle === 'string' ? (
              <DropdownMenu
                choices={schoolCycles}
                current={schoolCycle}
                setFn={setSchoolCycle}
                disabled={dropdownDisabled}
              />
            ) : null}
          </div>
        </div>
      </div>
      <div id={styles['page-container']}>
        <div id={styles['student-group-container']}>
          <div className={styles['header-section']}>
            <h2 className={styles['student-group-header']}>Student Group {studentGroupId}</h2>
            <Button
              variant="warning"
              className={styles['edit-group-btn']}
              onClick={() => setEditStudentGroupIsOpen(true)}
            >
              Edit Group <BsPencil />
            </Button>
          </div>
          {typeof siteId === 'number' && typeof masterTeacherId === 'number' ? (
            <EditStudentGroupModal
              siteId={siteId}
              // teacherId={masterTeacherId}
              studentGroupId={studentGroupId}
              isOpen={editStudentGroupIsOpen}
              setIsOpen={setEditStudentGroupIsOpen}
            />
          ) : null}
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
          <div id={styles['student-group-chart']}>
            <Graph
              title={`Average Scores for Student Group ${studentGroupId}`}
              xLabels={['Attitudinal', 'Academic']}
              preData={testScores.pre}
              postData={testScores.post}
            />
          </div>
          <Button className={styles['export-csv-btn']}> Export to CSV </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

console.log('HELLO');
export default StudentGroupView;
