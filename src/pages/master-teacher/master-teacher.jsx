import React, { useState, useEffect } from 'react';
import './master-teacher.module.css';
import { instanceOf } from 'prop-types';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend } from '../../common/utils';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';

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
        <h3>Student Groups</h3>
        {studentGroups.map(group => (
          <StudentGroup
            key={group.groupId}
            studentList={siteStudents
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
        {/* add the graphs */}
      </div>
      <div>
        <h3>Students</h3>
        {/* ?:Maybe alphabetical here? */}
        {siteStudents.map(s => (
          <StudentProfileBox key={s.studentId} studentName={`${s.firstName} ${s.lastName}`} />
        ))}
        {/* add the graphs */}
      </div>
    </div>
  );
};

MasterTeacherView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(MasterTeacherView);
