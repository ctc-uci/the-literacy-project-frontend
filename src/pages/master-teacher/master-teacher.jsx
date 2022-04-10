import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './master-teacher.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend } from '../../common/utils';
import Plus from '../../assets/icons/plus.svg';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import Graph from '../../components/Graph/Graph';
// import arrow from './arrow.png';

const MasterTeacherView = ({ cookies }) => {
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [siteAddress, setSiteAddress] = useState();
  const [studentGroups, setStudentGroups] = useState([]);
  const [siteStudents, setSiteStudents] = useState([]);
  const [categoricalPre, setCategoricalPre] = useState([]); // attitudinal + academic
  const [categoricalPost, setCategoricalPost] = useState([]); // attitudinal + academic
  const [sitePre, setSitePre] = useState([]); // site vs. other TLP
  const [sitePost, setSitePost] = useState([]); // site vs. other TLP

  // const calculateScores = data => {
  //   const pre = [];
  //   const post = [];
  //   data.forEach(student => {

  //   });

  //   return { pre, post };
  // };

  // fetch all site data given the site id
  const fetchSiteData = async siteId => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    const { siteName, addressStreet, addressCity, addressZip } = res.data;
    setSelectedSiteName(siteName);
    setSiteAddress(`${addressStreet}, ${addressCity} ${addressZip}`);

    const groups = await TLPBackend.get(`/student-groups/site/${siteId}`);
    setStudentGroups(groups.data);

    // TODO: set initial school year and cycle to filter
    const students = await TLPBackend.get(`/students/site/${siteId}`);
    setSiteStudents(students.data);
    console.log(students.data);
    setCategoricalPre([30, 21.5]);
    setCategoricalPost([54, 66.5]);
    setSitePre([30, 21.5]);
    setSitePost([54, 66.5]);
  };

  useEffect(() => {
    async function fetchTeacherData() {
      const teacherId = cookies.get(cookieKeys.USER_ID);
      const res = await TLPBackend.get(`/teachers/${teacherId}`);
      // TODO: set the initial site and store all other sites in toggle
      // call fetchSiteData onchange for toggle (set id as value)
      await fetchSiteData(res.data.sites[0]);
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
                  title={`Average Scores for ${selectedSiteName} site`}
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
                  studentList={siteStudents
                    .sort((a, b) => {
                      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
                      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
                      return 0;
                    })
                    .map(s => {
                      return group.groupId === s.studentGroupId ? s.firstName : '';
                    })
                    .filter(t => {
                      return t !== '';
                    })}
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
