/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './master-teacher.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import { TLPBackend, calculateScores, calculateSiteScores } from '../../common/utils';
import Plus from '../../assets/icons/plus.svg';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import StudentTable from '../../components/StudentTable/StudentTable';
import Graph from '../../components/Graph/Graph';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const MasterTeacherView = ({ cookies }) => {
  const [allData, setAllData] = useState([]);
  const [allSites, setAllSites] = useState({});
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [selectedSiteAddress, setSelectedSiteAddress] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedCycle, setSelectedCycle] = useState();
  const [siteGroups, setSiteGroups] = useState([]);
  const [studentGroups, setStudentGroups] = useState([]);
  const [siteStudents, setSiteStudents] = useState([]);
  const [schoolYears, setSchoolYears] = useState([]);
  const [cycles, setCycles] = useState([]);
  const [categoricalPre, setCategoricalPre] = useState([]); // attitudinal + academic
  const [categoricalPost, setCategoricalPost] = useState([]); // attitudinal + academic
  const [sitePre, setSitePre] = useState([]); // site vs. other TLP
  const [sitePost, setSitePost] = useState([]); // site vs. other TLP
  const [showToggle, setShowToggle] = useState(true);
  const DEMO = false;

  const filterSchoolYearCycle = async (
    filterOptions,
    groups = siteGroups,
    siteName = selectedSiteName,
    siteId = selectedSiteId,
  ) => {
    let year = selectedSchoolYear;
    let cycle = selectedCycle;

    // allow for optionally passing in year and cycle to change filter
    if (filterOptions.year) {
      year = filterOptions.year;
    }
    if (filterOptions.cycle) {
      cycle = filterOptions.cycle;
    }

    const filteredGroups = groups.filter(
      group => group.year === parseInt(year, 10) && group.cycle === cycle,
    );
    setStudentGroups(filteredGroups);

    const students = [];
    filteredGroups.forEach(group => {
      // in case the student group has no students, the students array will be null
      if (group.students.length > 0) {
        group.students.forEach(student => {
          students.push(student);
        });
      }
    });
    setSiteStudents(students);

    if (students.length === 0) {
      setCategoricalPre([]);
      setCategoricalPost([]);
      setSitePre([]);
      setSitePost([]);
      return;
    }

    const scores = calculateScores(students);

    let otherSites = [];
    if (siteName === 'View All') {
      const teacherId = cookies.get(cookieKeys.USER_ID);
      otherSites = await TLPBackend.get(`/students/other-teachers/${teacherId}`);
    } else {
      otherSites = await TLPBackend.get(`/students/other-sites/${siteId}`);
    }
    const otherSiteData = otherSites.data.filter(
      student => student.year === year && student.cycle === cycle,
    );
    const otherSiteScores = calculateScores(otherSiteData);

    if (scores.pre) {
      setCategoricalPre(scores.pre);
      setCategoricalPost(scores.post);

      const siteScores = calculateSiteScores(scores, otherSiteScores);
      setSitePre(siteScores.pre);
      setSitePost(siteScores.post);
    }
  };

  // handlers for changing school year and cycle
  const filterBySchool = async newYear => {
    const startYear = newYear.substring(0, 4);
    setSelectedSchoolYear(`${startYear}-${(startYear % 100) + 1}`);
    await filterSchoolYearCycle({ year: startYear });
  };

  const filterByCycle = async newCycle => {
    setSelectedCycle(newCycle);
    await filterSchoolYearCycle({ cycle: newCycle });
  };

  // filter site data using the given siteId, school year, cycle
  // default params for first filtering of Site Data, all other times use the useEffect params
  const filterSiteData = async (
    siteName = selectedSiteName,
    siteId = selectedSiteId,
    data = allData,
  ) => {
    let groups = data;
    if (siteName !== 'View All') {
      // all groups of selected site
      groups = data.filter(group => group.siteId === siteId);
    }

    const years = new Set();
    const cycleChoices = new Set();
    let filterOpts = {};

    // if there are any groups in given site, get all relevant year and cycle info
    if (groups.length !== 0) {
      // get all the possible years and cycle choices for selected site/option
      let initialYear = groups[0].year;
      let initialCycle = groups[0].cycle;
      groups.forEach(group => {
        // get the most recent year and cycle of filtered data
        if (group.year > initialYear) {
          initialYear = group.year;
        }
        if (group.cycle > initialCycle) {
          initialCycle = group.cycle;
        }
        years.add(`${group.year}-${(group.year % 100) + 1}`);
        cycleChoices.add(group.cycle);
      });

      if (DEMO) {
        years.add('2020-21');
        years.add('2021-22');
        years.add('2019-20');
        years.add('2020-21');

        cycleChoices.add('1');
      }

      setSelectedSchoolYear(`${initialYear}-${(initialYear % 100) + 1}`);
      setSelectedCycle(initialCycle);
      filterOpts = { year: initialYear, cycle: initialCycle };
    }

    setSchoolYears(Array.from(new Set(years)).sort().reverse());
    setCycles(Array.from(new Set(cycleChoices)).sort().reverse());

    // show all sites option if at least 2 sites (View All does not count as a site but is an option)
    setShowToggle(Object.keys(allSites).length > 2 || years.size > 1 || cycleChoices.size > 1);

    setSiteGroups(groups);
    await filterSchoolYearCycle(filterOpts, groups, siteName, siteId);
  };

  // update site info for new selected site
  const setSiteInfo = async name => {
    setSelectedSiteName(name);
    setSelectedSiteId(allSites[name]?.siteId);
    setSelectedSiteAddress(allSites[name]?.address);
    await filterSiteData(name, allSites[name]?.siteId);
  };

  useEffect(async () => {
    const teacherId = cookies.get(cookieKeys.USER_ID);

    async function fetchTeacherData() {
      const allStudentData = await TLPBackend.get(`/student-groups/master-teacher/${teacherId}`);
      // all unfiltered data for the MT to user for filtering later
      const { data } = allStudentData;
      setAllData(data);
      if (data.length === 0) {
        return;
      }

      // initially selected site is first site that gets returned
      // there has to be at least one site since only teachers that can login are those that are active in at least one student group/site
      const initialSite = {
        siteId: data[0].siteId,
        siteName: data[0].siteName,
        address: `${data[0].addressStreet}, ${data[0].addressCity} ${data[0].addressZip}`,
      };

      // sites object will be key: siteNames, values are siteId and address
      const teacherSites = {};
      data.forEach(group => {
        const address = `${group.addressStreet}, ${group.addressCity} ${group.addressZip}`;
        teacherSites[group.siteName] = {
          siteId: group.siteId,
          address,
        };
        // adding site address for each group for View All selection
        // displayed in Student Group section
        group.siteAddress = address;

        // adding area and site name for each student for View All selection
        // displayed in Student section table
        if (group.students.length > 0) {
          group.students.forEach(student => {
            student.areaName = group.areaName;
            student.siteName = group.siteName;
          });
        }
      });

      if (DEMO) {
        teacherSites['test Site'] = { siteId: -1, address: 'some address' };
        teacherSites['Demo Site'] = { siteId: -1, address: 'some other address' };
      }
      teacherSites['View All'] = null;

      setAllSites(teacherSites);
      setSelectedSiteName(initialSite.siteName);
      setSelectedSiteId(initialSite.siteId);
      setSelectedSiteAddress(initialSite.address);
      filterSiteData(initialSite.siteName, initialSite.siteId, data, teacherSites);
    }
    await fetchTeacherData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles.main}>
        {showToggle && (
          <div className={`${styles.section} ${styles['toggle-container']}`}>
            <div className={styles['toggle-bar']}>
              {/* only show option to select site if there is more than one site */}
              <div>
                {Object.keys(allSites).length > 2 && (
                  <DropdownMenu
                    choices={Object.keys(allSites)}
                    current={selectedSiteName}
                    setFn={setSiteInfo}
                  />
                )}
              </div>

              <div className={styles['flex-row']}>
                {schoolYears.length > 1 && (
                  <div className={styles['flex-row']}>
                    <h4>School Year</h4>
                    <DropdownMenu
                      choices={schoolYears}
                      current={selectedSchoolYear}
                      setFn={filterBySchool}
                    />
                  </div>
                )}

                {cycles.length > 1 && (
                  <div className={styles['flex-row']}>
                    <h4>Cycle</h4>
                    <DropdownMenu choices={cycles} current={selectedCycle} setFn={filterByCycle} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {selectedSiteName !== 'View All' && (
          <div className={styles.section}>
            <h3>{selectedSiteName}</h3>
            <h3 className={styles['gray-text']}>{selectedSiteAddress}</h3>
          </div>
        )}

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
              {studentGroups
                .sort((a, b) => (a.groupId > b.groupId ? 1 : -1))
                .map(group => (
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
                    viewAddress={selectedSiteName === 'View All'}
                    siteName={group.siteName}
                    address={group.siteAddress}
                  />
                ))}
            </div>
          )}
        </div>

        <div className={`${styles.section} ${styles['students-container']}`}>
          <div className={styles.header}>
            <h3>Students</h3>
            <Button variant="warning" className={styles['create-button']}>
              Create New Student
              <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
            </Button>
            {siteStudents.length !== 0 && (
              <Button className={styles['view-all-button']}>
                <p className={styles['view-all-text']}>View All</p>
              </Button>
            )}
          </div>
          {siteStudents.length === 0 ? (
            <div className={styles['empty-view']}>
              <h2>No students have been created for this site yet.</h2>
            </div>
          ) : (
            <div className={styles.content}>
              {selectedSiteName !== 'View All' ? (
                siteStudents
                  .slice(0, 6)
                  .map(s => (
                    <StudentProfileBox
                      key={s.studentId}
                      studentName={`${s.firstName} ${s.lastName}`}
                    />
                  ))
              ) : (
                <StudentTable data={siteStudents.slice(0, 6)} />
              )}
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
