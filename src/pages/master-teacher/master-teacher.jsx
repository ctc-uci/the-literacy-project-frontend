/* eslint-disable no-param-reassign */
import React, { useState, useEffect } from 'react';
import { instanceOf } from 'prop-types';
import { Button } from 'react-bootstrap';
import styles from './master-teacher.module.css';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import { withCookies, cookieKeys, Cookies } from '../../common/auth/cookie_utils';
import {
  TLPBackend,
  calculateScores,
  calculateSiteScores,
  formatSchoolYear,
} from '../../common/utils';
import Plus from '../../assets/icons/plus.svg';
import StudentGroup from '../../components/StudentGroup/StudentGroup';
import StudentProfileBox from '../../components/StudentProfileBox/StudentProfileBox';
import StudentTable from '../../components/StudentTable/StudentTable';
import Graph from '../../components/Graph/Graph';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';

const MasterTeacherView = ({ cookies }) => {
  const [allData, setAllData] = useState([]); // all student group data
  const [allSites, setAllSites] = useState({}); // list of sites with associated site id and address
  const [selectedSiteName, setSelectedSiteName] = useState();
  const [selectedSiteId, setSelectedSiteId] = useState();
  const [selectedSiteAddress, setSelectedSiteAddress] = useState();
  const [selectedSchoolYear, setSelectedSchoolYear] = useState();
  const [selectedCycle, setSelectedCycle] = useState('1');
  const [siteGroups, setSiteGroups] = useState([]); // filtered student groups for site id
  const [studentGroups, setStudentGroups] = useState([]); // filtered student groups additionally on year and cycle
  const [siteStudents, setSiteStudents] = useState([]); // filtered students additionally on year and cycle
  const [schoolYears, setSchoolYears] = useState([]); // all past school years from student groups + current year
  const [categoricalPre, setCategoricalPre] = useState([]); // attitudinal + academic
  const [categoricalPost, setCategoricalPost] = useState([]); // attitudinal + academic
  const [sitePre, setSitePre] = useState([]); // site vs. other TLP
  const [sitePost, setSitePost] = useState([]); // site vs. other TLP
  const [siteToggle, setSiteToggle] = useState(true); // true if want to enable toggling options
  const [yearToggle, setYearToggle] = useState(true);
  const VIEW_ALL = 'All Sites';
  const cycles = ['1', '2', '3', '4'];

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
      if (group.students && group.students.length > 0) {
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
    if (siteName === VIEW_ALL) {
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
    setSelectedSchoolYear(formatSchoolYear(newYear));
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
    if (siteName !== VIEW_ALL) {
      // all groups of selected site
      groups = data.filter(group => group.siteId === siteId);
    }

    const years = new Set();
    const currDay = new Date();
    let filterOpts = {};

    // if there are any groups in given site, get all relevant year and cycle info
    if (groups.length === 0) {
      return;
    }
    let recentYear = groups[0].year;
    // get all the possible years for selected site/option
    groups.forEach(group => {
      if (group.year > recentYear) {
        recentYear = group.year;
      }
      years.add(formatSchoolYear(group.year));
    });

    let currYear = null;
    if (currDay.getMonth() >= 6) {
      currYear = currDay.getFullYear();
      years.add(formatSchoolYear(currYear));
    } else {
      currYear = formatSchoolYear(recentYear);
    }

    setSelectedSchoolYear(currYear);
    filterOpts = { year: currYear, cycle: selectedCycle };

    setSchoolYears(Array.from(years).sort().reverse());
    setYearToggle(years.size > 1);

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
        if (group.students && group.students.length > 0) {
          group.students.forEach(student => {
            student.areaName = group.areaName;
            student.siteName = group.siteName;
          });
        }
      });

      teacherSites[VIEW_ALL] = null;

      setAllSites(teacherSites);
      setSelectedSiteName(initialSite.siteName);
      setSelectedSiteId(initialSite.siteId);
      setSelectedSiteAddress(initialSite.address);
      setSiteToggle(Object.keys(teacherSites).length > 2);
      await filterSiteData(initialSite.siteName, initialSite.siteId, data, teacherSites);
    }
    await fetchTeacherData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles.main}>
        <div className={`${styles.section} ${styles['toggle-container']}`}>
          <div className={styles['toggle-bar']}>
            {/* only show option to select site if there is more than one site */}
            <div>
              <DropdownMenu
                className={styles['dropdown-btn']}
                choices={Object.keys(allSites)}
                current={selectedSiteName}
                setFn={setSiteInfo}
                disabled={!siteToggle}
              />
            </div>

            <div className={styles['inner-toggle-bar']}>
              <div className={styles['inner-toggle-bar']}>
                <h4>School Year</h4>
                <DropdownMenu
                  className={styles['dropdown-btn']}
                  choices={schoolYears}
                  current={selectedSchoolYear}
                  setFn={filterBySchool}
                  disabled={!yearToggle}
                />
              </div>

              <div className={styles['inner-toggle-bar']}>
                <h4>Cycle</h4>
                <DropdownMenu
                  className={styles['dropdown-btn']}
                  choices={cycles}
                  current={selectedCycle}
                  setFn={filterByCycle}
                />
              </div>
            </div>
          </div>
        </div>

        {selectedSiteName !== VIEW_ALL && (
          <div className={styles.section}>
            <h3>{selectedSiteName}</h3>
            <h3 className={styles['gray-text']}>{selectedSiteAddress}</h3>
          </div>
        )}

        <div className={styles.section}>
          <h3>Data</h3>
          {categoricalPre.length === 0 ? (
            <div className={styles['empty-view']}>
              <h2>No data is available for this selected time.</h2>
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
              <h2>No student group is available for this selected time.</h2>
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
                    viewAddress={selectedSiteName === VIEW_ALL}
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
              <h2>No students have been created for this selected time.</h2>
            </div>
          ) : (
            <div className={styles.content}>
              {selectedSiteName !== VIEW_ALL ? (
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
