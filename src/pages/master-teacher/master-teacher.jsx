import React, { useState, useEffect } from 'react';
import './master-teacher.module.css';
import { instanceOf } from 'prop-types';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend } from '../../common/utils';

const MasterTeacherView = ({ cookies }) => {
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [siteAddress, setSiteAddress] = useState();
  const [studentGroups, setStudentGroups] = useState([]);

  // fetch all site data given the site id
  const fetchSiteData = async siteId => {
    const res = await TLPBackend.get(`/sites/${siteId}`);
    const { siteName, addressStreet, addressCity, addressZip } = res.data;
    setSelectedSiteName(siteName);
    setSiteAddress(`${addressStreet}, ${addressCity} ${addressZip}`);

    const groups = await TLPBackend.get(`/student-groups/site/${siteId}`);
    setStudentGroups(groups.data);
    console.log(studentGroups); // just so the error goes away
    // TODO: set initial school year and cycle to filter
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
        {/* add the graphs */}
      </div>
      <div>
        <h3>Students</h3>
        {/* add the graphs */}
      </div>
    </div>
  );
};

MasterTeacherView.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
};

export default withCookies(MasterTeacherView);
