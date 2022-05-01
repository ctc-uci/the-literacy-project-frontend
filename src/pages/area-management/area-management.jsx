import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Button,
  Card,
  DropdownButton,
  Dropdown,
  InputGroup,
  FormControl,
  Form,
} from 'react-bootstrap';
import { BsFillCaretDownFill, BsPeople, BsFilterRight, BsFilter } from 'react-icons/bs';
import { TLPBackend, calculateScores } from '../../common/utils';
import styles from './area-management.module.css';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import Graph from '../../components/Graph/Graph';
import AreaManagementFilter from '../../components/AreaManagementFilter/AreaManagementFilter';

const AreaManagement = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  const [schoolYear, setSchoolYear] = useState('All');
  const [testScores, setTestScores] = useState({});
  const [error, setError] = useState(null);

  function getFilters() {
    return Object.entries(filters).reduce((acc, [, filter]) => {
      if (filter) {
        acc.push(filter);
      }
      return acc;
    }, []);
  }

  function displayAreas() {
    return areaResponseData
      .filter(area => {
        return getFilters().every(filter => filter(area));
      })
      .map(area => {
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

  function getSchoolYears() {
    return areaResponseData
      .reduce(
        (acc, area) => {
          if (area.year && !acc.includes(area.year)) {
            acc.push(area.year);
          }
          return acc;
        },
        ['All'],
      )
      .sort()
      .reverse();
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);

    const schoolYearFilter = newSchoolYear === 'All' ? null : area => area.year === newSchoolYear;

    setFilters({
      ...filters,
      year: schoolYearFilter,
    });
  };

  const filterSearch = event => {
    event.preventDefault();
    const search = event.target[0].value;

    const searchFilter =
      search === '' ? null : area => area.areaName.toLowerCase().includes(search.toLowerCase());

    setFilters({
      ...filters,
      search: searchFilter,
    });
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
                  {getSchoolYears().map(year => (
                    <Dropdown.Item
                      onClick={() => {
                        updateSchoolYear(year);
                      }}
                      key={year}
                    >
                      {year}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
              <Form onSubmit={filterSearch}>
                <div className={styles['search-school']}>
                  <InputGroup>
                    <FormControl
                      className={styles['search-school-search-bar']}
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="search-school-search-icon"
                    />
                    <InputGroup.Text
                      id={styles['search-school-search-icon']}
                      onChange={filterSearch}
                    >
                      <BsFilterRight />
                    </InputGroup.Text>
                  </InputGroup>
                  <Button
                    variant="primary"
                    className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
                    type="submit"
                  >
                    Search
                  </Button>
                </div>
              </Form>
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
                  onClick={() => setFilterModalIsOpen(true)}
                >
                  Filter By <BsFilter />
                </Button>
                <AreaManagementFilter
                  isOpen={filterModalIsOpen}
                  setIsOpen={setFilterModalIsOpen}
                  states={['California', 'Utah']}
                  filters={filters}
                  setFilters={setFilters}
                />
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
            {displayAreas()}
          </div>
          <div className={styles['sites-data']}>
            <p>
              <strong>All Area Data</strong>
            </p>
            <Button
              variant="primary"
              className={`${styles['tlp-button']} ${styles['tlp-button-primary']}`}
            >
              Export to CSV
            </Button>
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
