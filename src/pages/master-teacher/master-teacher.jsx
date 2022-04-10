import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Button } from 'react-bootstrap';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend } from '../../common/utils';
import Plus from '../../assets/icons/plus.svg';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import '../../common/vars.css';
import styles from './master-teacher.module.css';

const MasterTeacherView = ({ cookies }) => {
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [siteAddress, setSiteAddress] = useState();
  const [studentGroups, setStudentGroups] = useState([]);
  const [siteStudents, setSiteStudents] = useState([]);

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
      <div>
        <h3>{selectedSiteName}</h3>
        <h3>{siteAddress}</h3>
      </div>
      <div>
        <h3>Data</h3>
        {/* add the graphs */}
      </div>
      <div>
        <div className={styles['student-groups-header']}>
          <h3 className={styles['mtd-subheadings']}>Student Groups</h3>
          <Button variant="warning" className={styles['create-button']}>
            Create Student Group
            <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
          </Button>
        </div>
        <div className={styles['student-groups-content']}>
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
      </div>
      <div>
        <div className={styles['students-header']}>
          <h3>Students</h3>
          <Button variant="warning" className={styles['create-button']}>
            Create New Student
            <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
          </Button>
        </div>
        <div className={styles['students-content']}>
          {siteStudents.slice(0, 6).map(s => (
            <StudentProfileBox key={s.studentId} studentName={`${s.firstName} ${s.lastName}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

MasterTeacherView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(MasterTeacherView);
