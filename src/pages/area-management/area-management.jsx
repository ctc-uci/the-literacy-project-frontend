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
import { BsPeople, BsFilterRight, BsFilter } from 'react-icons/bs';
import { TLPBackend, calculateScores, formatSchoolYear } from '../../common/utils';
import styles from './area-management.module.css';
import Plus from '../../assets/icons/plus.svg';
import CreateAreaModal from '../../components/CreateAreaModal/CreateAreaModal';
import AreaDropdown from '../../components/AreaDropdown/AreaDropdown';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import Graph from '../../components/Graph/Graph';
import CSVButton from '../../components/CSVButton/CSVButton';
import AreaManagementFilter from '../../components/AreaManagementFilter/AreaManagementFilter';

const AreaManagement = () => {
  const [modalIsOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [areaResponseData, setAreaResponseData] = useState([]);
  const [schoolYear, setSchoolYear] = useState('All');
  const [sortBy, setSortBy] = useState('A-Z');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const sorts = ['A-Z', 'Z-A'];

  function getFilters() {
    return Object.entries(filters).reduce((acc, [, filter]) => {
      if (filter) {
        acc.push(filter);
      }
      return acc;
    }, []);
  }

  // Sorting function for areas
  function compareAreas(area1, area2) {
    const a1 = area1.areaName.toLowerCase();
    const a2 = area2.areaName.toLowerCase();

    switch (sortBy) {
      case 'A-Z':
        return a1 < a2 ? -1 : 1;
      case 'Z-A':
        return a1 < a2 ? 1 : -1;
      default:
        return a1 < a2 ? -1 : 1;
    }
  }

  function getFilteredAreas() {
    const filterFunctions = getFilters();

    return areaResponseData
      .filter(area => {
        return filterFunctions.every(filter => filter(area));
      })
      .sort(compareAreas);
  }

  function displayAreas() {
    const filteredAreas = getFilteredAreas();

    return filteredAreas.map(area => {
      return (
        <AreaDropdown
          areaId={area.areaId}
          areaActive={area.active}
          areaName={area.areaName}
          areaState={area.areaState}
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

  function getAreaStats(areas) {
    return areas.reduce(
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
          if (area.years) {
            area.years.forEach(year => {
              if (!acc.includes(year)) {
                acc.push(year);
              }
            });
          }
          return acc;
        },
        ['All'],
      )
      .sort()
      .reverse();
  }

  function getStates() {
    return areaResponseData
      .reduce((acc, area) => {
        if (area.areaState && !acc.includes(area.areaState)) {
          acc.push(area.areaState);
        }
        return acc;
      }, [])
      .sort();
  }

  function displayAreaStats() {
    const filteredAreas = getFilteredAreas();
    const areaStats = getAreaStats(filteredAreas);
    const filterApplied = filteredAreas.length !== areaResponseData.length;
    const testScores = calculateScores(
      filterApplied
        ? students.filter(student => filteredAreas.some(area => area.areaId === student.areaId)) // Only return students in the filteredAreas
        : students, // No filters were applied, show all students
    );

    return (
      <>
        <Card className={styles['area-data-stats']}>
          <p className={styles['area-data-title']}>
            {filterApplied ? 'Filtered' : 'All'} Areas Data Overview
          </p>
          <div className={styles['area-data-info']}>
            <p>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={SchoolIcon}
                alt="School Icon"
              />
              {areaStats.site_count} Sites
            </p>
            <p>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={TeacherIcon}
                alt="Teacher Icon"
              />
              {areaStats.master_teacher_count} Teachers
            </p>
            <p>
              <BsPeople className={styles['area-mt-icon']} />
              {areaStats.student_count} Students
            </p>
          </div>
          <CSVButton type="allAreas" />
        </Card>

        <p>{filterApplied ? 'Filtered Areas' : 'All Areas'}</p>
        <p>{schoolYear === 'All' ? 'All Years' : formatSchoolYear(schoolYear)}</p>
        <Card className={styles['sites-graph']}>
          <Graph
            title="Average Growth in Reading"
            xLabels={['Attitudinal', 'Academic']}
            preData={testScores.pre}
            postData={testScores.post}
          />
        </Card>
      </>
    );
  }

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);

    const schoolYearFilter =
      newSchoolYear === 'All' ? null : area => area.years && area.years.includes(newSchoolYear);

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
        setStudents(studentScoresRes.data);
      } else {
        setStudents([]);
        setError(error);
      }
    }
    fetchStudents();
  }, [modalIsOpen]);

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
                  title={schoolYear === 'All' ? schoolYear : formatSchoolYear(schoolYear)}
                  className={styles['school-year-dropdown']}
                >
                  {getSchoolYears().map(year => (
                    <Dropdown.Item
                      onClick={() => {
                        updateSchoolYear(year);
                      }}
                      key={year}
                    >
                      {year === 'All' ? year : `${formatSchoolYear(year)}`}
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
                Create New Area
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
                  states={getStates()}
                  filters={filters}
                  setFilters={setFilters}
                />
                <DropdownButton
                  variant="primary"
                  title={`Sort By: ${sortBy}`}
                  className={styles['tlp-button']}
                >
                  {sorts.map(sort => (
                    <Dropdown.Item
                      onClick={() => {
                        setSortBy(sort);
                      }}
                      key={sort}
                    >
                      {sort}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </div>
            </div>
            <AreaDropdown
              areaId="all"
              areaActive
              areaName="All Areas"
              areaStats={getAreaStats(areaResponseData)}
              areaSites={getAllAreaSites()}
              key="area-dropdown-all"
              editable={false}
              hideSitesLink
            />
            <div style={{ paddingBottom: '20px' }}>{displayAreas()}</div>
          </div>
          <div className={styles['sites-data']}>{displayAreaStats()}</div>
        </div>
      </div>
    </div>
  );
};

export default AreaManagement;
