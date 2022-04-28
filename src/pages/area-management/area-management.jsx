import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { Button, Card, DropdownButton, Dropdown, InputGroup, FormControl } from 'react-bootstrap';
import { BsFillCaretDownFill, BsPeople, BsFilterRight, BsFilter } from 'react-icons/bs';
import { TLPBackend, calculateScores } from '../../common/utils';
import styles from './area-management.module.css';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import Graph from '../../components/Graph/Graph';
import CSVButton from '../../components/CSVButton/CSVButton';

const AreaManagement = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  const [schoolYear, setSchoolYear] = useState('2020-21');
  const [testScores, setTestScores] = useState({});
  const [error, setError] = useState(null);

  function mapAreas() {
    return areaResponseData.map(area => {
      return (
        <AreaDropdown
          areaId={area.areaId}
          areaActive={area.active}
          areaName={area.areaName}
          areaStats={{
            student_count: area.numStudents || 0,
            master_teacher_count: area.numMts || 0,
            site_count: area.numSites || 0,
          }}
          areaSites={area.siteInfo || []}
          key={`area-dropdown-${area.areaId}`}
        />
      );
    });
  }

  function getAllAreaStats() {
    return areaResponseData.reduce(
      (acc, area) => {
        acc.student_count += area.numStudents || 0;
        acc.master_teacher_count += area.numMts || 0;
        acc.site_count += area.numSites || 0;
        return acc;
      },
      {
        student_count: 0,
        master_teacher_count: 0,
        site_count: 0,
      },
    );
  }

  function getAllAreaSites() {
    const temp = areaResponseData.reduce((acc, area) => {
      if (area.siteInfo) {
        acc.push(...area.siteInfo);
      }
      return acc;
    }, []);
    return temp;
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);
  };

  useEffect(() => {
    TLPBackend.get('/areas/area-management').then(res => {
      setAreaResponseData(res.data);
    });

    async function fetchStudents() {
      const studentScoresRes = await TLPBackend.get(`/students`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (studentScoresRes.status === 200) {
        setTestScores(calculateScores(studentScoresRes.data));
      } else {
        setTestScores('');
        setError(error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <div>
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
                  className={styles['school-year-dropdown']}
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
            <AreaDropdown
              areaId="all"
              areaActive
              areaName="All Areas"
              areaStats={getAllAreaStats()}
              areaSites={getAllAreaSites()}
              key="area-dropdown-all"
              editable={false}
              hideSitesLink
            />
            {mapAreas()}
          </div>
          <div className={styles['sites-data']}>
            s{' '}
            <p>
              <strong>All Area Data</strong>
            </p>
            <CSVButton />
            <Card className={styles['area-data-stats']}>
              <p>
                <BsPeople /> 40 Students
              </p>
              <p>
                <img
                  className={styles['area-dropdown__open__area_stats__section-icon']}
                  src={TeacherIcon}
                  alt="Teacher Icon"
                />
                4 Teachers
              </p>
              <p>
                <img
                  className={styles['area-dropdown__open__area_stats__section-icon']}
                  src={SchoolIcon}
                  alt="School Icon"
                />
                4 Sites
              </p>
            </Card>
            <p>All Areas</p>
            <p>Year: 2021-22 Cycle: 1</p>
            <p>
              <strong>Average Growth in Reading</strong>
            </p>
            {/* placeholder for graph */}
            <Card className={styles['sites-graph']}>
              <Graph
                // title={`Average Growth in Reading`}
                xLabels={['Attitudinal', 'Academic']}
                preData={testScores.pre}
                postData={testScores.post}
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaManagement;
