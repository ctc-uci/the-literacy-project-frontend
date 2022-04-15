import React, { useState, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { Button, Card, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillCaretDownFill, BsFilterRight, BsFilter } from 'react-icons/bs';
import { TLPBackend } from '../../common/utils';
import styles from './sites.module.css';
// import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';

const SiteView = () => {
  // const [areaDropdownTitle, setAreaDropdownTitle] = useState('Bellevue SD');

  const [modalIsOpen, setModalOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  // const [siteResponseData, setSiteResponseData] = useState([]);
  // THIS IS ALL STUDENTS - LEAVE A GITHUB COMMENT ON THIS (template for teachers and areas)
  // filter by area id?? see if student is in site in the area
  const [studentResponseData, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [schoolYear, setSchoolYear] = useState(['2020-21']);

  const areaHeaders = ['Area ID', 'Area Name', 'Active?'];
  // const areaManagementStudentHeaders = ['Student Name', 'Student Pretest R'];
  const areaData = areaResponseData.map(area => [area.areaId, area.areaName, area.active]);
  // const siteData = siteResponseData.map(site => [site.siteId, site.siteName, site.addressStreet, site.addressCity, site.addressZip, site.addressState, site.areaId]);
  // const studentData = studentResponseData.map(student => [
  //   student.studentId,
  //   student.firstName,
  //   student.lastName,
  //   student.homeTeacher,
  //   student.pretestR,
  //   student.posttestR,
  //   student.pretestA,
  //   student.posttestA,
  //   student.siteId,
  // ]);
  // const studentData = students.map(student => [student.firstName, student.lastName]);
  // console.log(studentData, studentData.length);
  // console.log('site arr:');
  // console.log(siteData);

  // console.log('student arr:');
  // console.log(studentData);

  const areaCsvReport = {
    data: areaData,
    headers: areaHeaders,
    filename: 'Areas_Report.csv',
  };

  // const studentCSVReport = {
  //   data: studentData,
  //   headers: areaManagementStudentHeaders,
  //   filename: 'student_data.csv',
  // }

  const addAssociatedSiteToArea = async resData => {
    async function fetchAllSites() {
      // eslint-disable-next-line no-plusplus
      for (let ind = 0; ind < resData.length; ind++) {
        TLPBackend.get(`/sites/area/${resData[ind].areaId}`)
          .then(res => {
            // eslint-disable-next-line no-param-reassign
            resData[ind].area_sites = res.data;
            // console.log(resData[ind]);
            // console.log(res);
            // console.log(resData);
          })
          .catch(() => {});

        TLPBackend.get(`/students/area/${resData[ind].areaId}`)
          // eslint-disable-next-line no-loop-func
          .then(res => {
            // console.log('inside res');
            // console.log(res.data);
            setStudents(res.data.concat(studentResponseData));
          })
          .catch(() => {});
      }
    }
    await fetchAllSites();
    setTimeout(() => {
      setAreaResponseData(resData);
    }, 2000);
  };

  function mapAreas(studentCount) {
    return areaResponseData.map(area => {
      return (
        <AreaDropdown
          areaId={area.areaId}
          areaActive={area.active}
          areaName={area.areaName}
          areaStats={{
            student_count: studentCount,
            master_teacher_count: 2,
            site_count: 2,
          }}
          areaSites={area.area_sites}
          key={`area-dropdown-${area.areaId}`}
        />
      );
    });
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);
  };

  useEffect(() => {
    async function fetchAreas() {
      await TLPBackend.get('/areas')
        .then(res => {
          setTimeout(() => {
            addAssociatedSiteToArea(res.data);
          }, 1000);
        })
        .catch(() => {});
    }
    async function fetchSites() {
      await TLPBackend.get('/sites').then(res => {
        setTimeout(() => {
          console.log(res.data);
        }, 1000);
      });
    }

    // FIX THIS TOO
    // async function fetchStudents() {
    //   await TLPBackend.get('/students')
    //     .then(res => {
    //       setTimeout(() => {
    //         studentsByArea(res.data);
    //       }, 1000);
    //     })
    //     .catch(() => {});
    // }

    async function getAllTeacherCount() {
      await TLPBackend.get('/teachers')
        .then(res => {
          setTimeout(() => {
            setTeachers(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    fetchAreas();
    fetchSites();
    // fetchStudents();
    getAllTeacherCount();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className={styles['site-container']}>
        <h1>Areas</h1>
        <div className={styles['area-content']}>
          <div className={styles['site-container-information']}>
            <div className={styles['school-year-info']}>
              <div className={styles['school-year-container']}>
                <h2>School Year</h2>
                <DropdownButton
                  variant="outline-secondary"
                  title={schoolYear}
                  id={styles['input-group-dropdown-1']}
                >
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2021-22');
                    }}
                  >
                    2021-22
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2020-21');
                    }}
                  >
                    2020-21
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateSchoolYear('2019-20');
                    }}
                  >
                    2019-20
                  </Dropdown.Item>
                </DropdownButton>
              </div>
              <div className={styles['search-school']}>
                <InputGroup>
                  <FormControl
                    className={styles['search-school-search-bar']}
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-school-search-icon"
                  />
                  <InputGroup.Text id={styles['search-school-search-icon']}>
                    <BsFilterRight />
                  </InputGroup.Text>
                </InputGroup>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                >
                  Search
                </Button>
              </div>
            </div>
            <div className={styles['area-button-options-container']}>
              <Button
                variant="warning"
                className={styles['create-new-area-button']}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <img className={styles.plus__icon} src={Plus} alt="Plus Icon" />
                New Area
              </Button>
              <CreateAreaModal isOpen={modalIsOpen} setIsOpen={setModalOpen} />
              <div className={styles['area-button-options-right']}>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                  onClick={() => {}}
                >
                  Filter By <BsFilter />
                </Button>
                <Button
                  variant="primary"
                  className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                  onClick={() => {}}
                >
                  Sort By: A-Z <BsFillCaretDownFill />
                </Button>
              </div>
            </div>
            {mapAreas()}
          </div>
          <div className="data">
            <Button variant="primary">
              {/* <CSVLink {...studentCSVReport} className="csvLink"> */}
              <CSVLink {...areaCsvReport} className="csvLink">
                Export to CSV
              </CSVLink>
            </Button>
            <h2>Data</h2>
            <h3>Average Scores</h3>
            {/* placeholder for graph */}
            <Card className="graph" />
            <Card className="stats">
              <p>{studentResponseData.length} Students</p>
              <p>{teachers.length} Teachers</p>
              <p>4 Sites</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteView;
