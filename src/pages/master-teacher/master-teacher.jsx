import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './master-teacher.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend, calculateScores } from '../../common/utils';
import Plus from '../../assets/icons/plus.svg';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import Graph from '../../components/Graph/Graph';
// import arrow from './arrow.png';

const MasterTeacherView = ({ cookies }) => {
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedCycle, setSelectedCycle] = useState();
  const [siteAddress, setSiteAddress] = useState();
  const [studentGroups, setStudentGroups] = useState([]);
  const [siteStudents, setSiteStudents] = useState([]);
  const [allData, setAllData] = useState([]);
  const [categoricalPre, setCategoricalPre] = useState([]); // attitudinal + academic
  const [categoricalPost, setCategoricalPost] = useState([]); // attitudinal + academic
  const [sitePre, setSitePre] = useState([]); // site vs. other TLP
  const [sitePost, setSitePost] = useState([]); // site vs. other TLP

  // filter site data using the given siteId, school year, cycle
  // default params for first filtering of Site Data, all other times use the useEffect params
  const filterSiteData = async (
    data = allData,
    siteId = selectedSiteId,
    year = selectedSchoolYear,
    cycle = selectedCycle,
  ) => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    const { siteName, addressStreet, addressCity, addressZip } = res.data;
    setSelectedSiteName(siteName);
    setSiteAddress(`${addressStreet}, ${addressCity} ${addressZip}`);

    const filteredGroups = data.filter(
      group => group.siteId === siteId && group.year === year && group.cycle === cycle,
    );
    setStudentGroups(filteredGroups);

    const students = [];

    filteredGroups.forEach(studentGroup => {
      studentGroup.students.forEach(student => {
        students.push(student);
      });
    });
    setSiteStudents(students);

    const scores = calculateScores(students);
    setCategoricalPre(scores.pre);
    setCategoricalPost(scores.post);

    // TODO: site vs. other TLP data
    const otherSites = await TLPBackend.get(`/students/other-sites/${siteId}`);
    otherSites.data.filter(student => student.year === year && student.cycle === cycle);
    setSitePre([30, 21.5]);
    setSitePost([54, 66.5]);
  };

  useEffect(() => {
    const teacherId = cookies.get(cookieKeys.USER_ID);

    async function fetchTeacherData() {
      const allStudentData = await TLPBackend.get(`/student-groups/master-teacher/${teacherId}`);
      // all unfiltered data for the MT to user for filtering later
      setAllData(allStudentData.data);
      console.log(allStudentData.data);

      // call fetchSiteData onchange for toggle (set id as value)
      const initialSite = allStudentData.data[0].siteId;
      const initialYear = new Date().getFullYear();
      const initialCycle = '4';
      setSelectedSiteId(initialSite);
      setSelectedCycle(initialCycle);
      setSelectedSchoolYear(initialYear);
      filterSiteData(allStudentData.data, initialSite, initialYear, initialCycle);
    }
    fetchTeacherData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div>{/* toggle bar */}</div>
      <div className={styles.main}>
        <div className={styles.section}>
          <h3>{selectedSiteName}</h3>
          <h3 className={styles['gray-text']}>{siteAddress}</h3>
        </div>

        <div className={styles.section}>
          <h3>Data</h3>
          {categoricalPre.length === 0 ? (
            <div className={styles['empty-view']}>
              <h2>No data is available for this site yet.</h2>
            </div>
          ) : (
            <div className={styles['graph-container']}>
              <div className={styles.graph}>
                <Graph
                  title={`Average Scores for ${selectedSiteName} Site`}
                  xLabels={['Attitudinal', 'Academic']}
                  preData={categoricalPre}
                  postData={categoricalPost}
                />
              </div>
              <div className={styles.graph}>
                <Graph
                  title={`${selectedSiteName} Site Average Scores vs. Other TLP Sites`}
                  xLabels={[`${selectedSiteName}`, 'Other TLP']}
                  preData={sitePre}
                  postData={sitePost}
                />
              </div>
            </div>
          )}
        </div>
        <div className={styles.section}>
          <div className={styles.header}>
            <h3>Student Groups</h3>
            <Button variant="warning" className={styles['create-button']}>
              Create Student Group
              <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
            </Button>
          </div>
          {studentGroups.length === 0 ? (
            <div className={styles['empty-view']}>
              <h2>No Student Groups is available for this site yet.</h2>
            </div>
          ) : (
            <div className={styles.content}>
              {studentGroups.map(group => (
                <StudentGroup
                  key={group.groupId}
                  groupName={group.name}
                  studentList={
                    group.students
                      ? group.students.map(s => {
                          return s.firstName;
                        })
                      : []
                  }
                  meetingDay={group.meetingDay}
                  meetingTime={group.meetingTime}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.section}>
          <div className={styles.header}>
            <h3>Students</h3>
            <Button variant="warning" className={styles['create-button']}>
              Create New Student
              <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
            </Button>
          </div>
          {siteStudents.length === 0 ? (
            <div className={styles['empty-view']}>
              <h2>No students have been created for this site yet.</h2>
              <h2>Click here to create.</h2>
              {/* <img
                className={styles.arrow}
                src={arrow}
                alt="arrow pointing to create student button"
              /> */}
            </div>
          ) : (
            <div className={styles.content}>
              {siteStudents.slice(0, 6).map(s => (
                <StudentProfileBox key={s.studentId} studentName={`${s.firstName} ${s.lastName}`} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MasterTeacherView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(MasterTeacherView);
