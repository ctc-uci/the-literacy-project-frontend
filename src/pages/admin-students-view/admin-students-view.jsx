import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import '../../custom.scss';
import '../../common/vars.css';
import styles from './admin-students-view.module.css';
import Table from '../../components/Table/Table';
import { TLPBackend, capitalize, formatSchoolYear } from '../../common/utils';
import AdminStudentFilter from '../../components/AdminStudentFilter/AdminStudentFilter';

const AdminStudentsView = () => {
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('A-Z');
  const [searchText, setSearchText] = useState('');
  const [filterModalIsOpen, setFilterModalIsOpen] = useState(false);
  const [filters, setFilters] = useState({});

  const sorts = ['A-Z', 'Z-A'];

  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Site',
      headerPopover: '',
    },
    {
      headerTitle: 'Grade',
      headerPopover: '',
    },
    {
      headerTitle: 'Gender',
      headerPopover: '',
    },
    {
      headerTitle: 'Home Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Ethnicity',
      headerPopover: '',
    },
    {
      headerTitle: 'Area',
      headerPopover: '',
    },
    {
      headerTitle: 'School Year/Cycle',
      headerPopover: '',
    },
    {
      headerTitle: 'View Profile',
      headerPopover: '',
    },
  ];

  const inputHandler = e => {
    setSearchText(e.target.value.toLowerCase());
  };

  const formatEthnicity = ethnicity => {
    let eth = '';
    ethnicity.forEach(e => {
      eth += `${capitalize(e)}, `;
    });
    return eth.slice(0, -2);
  };

  const formatSiteInfo = (siteName, areaName, year, cycle) => {
    const site = siteName || 'No assigned site';
    const area = areaName || 'No assigned area';
    let schoolYearAndCycle = year ? formatSchoolYear(year) : 'N/A';
    schoolYearAndCycle = cycle ? `${schoolYearAndCycle}/Cycle ${cycle}` : 'N/A';

    return [site, area, schoolYearAndCycle];
  };

  const formatGrade = grade => {
    if (grade === 1) {
      return '1st';
    }
    if (grade === 2) {
      return '2nd';
    }
    if (grade === 3) {
      return '3rd';
    }
    return `${grade}th`;
  };

  useEffect(async () => {
    const res = await TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setStudentList(res.data);
    } else {
      setStudentList([]);
      setError(error);
    }
  }, []);

  const tbodyData = [];
  studentList.forEach(studentObj => {
    const {
      firstName,
      lastName,
      siteName,
      ethnicity,
      areaName,
      year,
      cycle,
      homeTeacher,
      gender,
      grade,
    } = studentObj;
    const eth = formatEthnicity(ethnicity);
    const [site, area, schoolYearAndCycle] = formatSiteInfo(siteName, areaName, year, cycle);
    const ht = homeTeacher || 'Not recorded';
    const grd = formatGrade(grade);
    tbodyData.push({
      id: studentObj.studentId,
      items: [
        `${lastName}, ${firstName}`,
        site,
        grd,
        capitalize(gender),
        ht,
        eth,
        area,
        schoolYearAndCycle,
        'View Scores',
      ],
    });
  });

  // Compares two names alphabetically
  const compareNames = (field1, field2) => {
    const f1 = field1.items[0].toLowerCase(); // items[0] gives the student name
    const f2 = field2.items[0].toLowerCase();

    switch (sortBy) {
      case 'A-Z':
        return f1 < f2 ? -1 : 1;
      case 'Z-A':
        return f1 < f2 ? 1 : -1;
      default:
        return f1 < f2 ? -1 : 1;
    }
  };

  const search = data => {
    return data.filter(row => {
      const name = row.items[0].toLowerCase();
      return name.includes(searchText);
    });
  };

  const applyFilters = data => {
    let updatedData = data;
    if (filters.areas) {
      updatedData = updatedData.filter(student => {
        const areaName = student.items[6]; // items[6] is area
        return filters.areas.includes(areaName); // check if area name in the areas to keep
      });
    }
    if (filters.sites) {
      updatedData = updatedData.filter(student => {
        const siteName = student.items[1]; // items[1] is site
        return filters.sites.includes(siteName); // check if site name in the sites to keep
      });
    }
    if (filters.years) {
      updatedData = updatedData.filter(student => {
        const year = student.items[7].slice(0, 7); // items[7] is year
        return filters.years.includes(year); // check if year in the years to keep
      });
    }
    if (filters.grades) {
      updatedData = updatedData.filter(student => {
        const grade = student.items[2]; // items[2] is grade
        return filters.grades.includes(grade); // check if grade in the grades to keep
      });
    }
    return updatedData;
  };

  // Applies search criteria, then filters, then sorts
  const displayData = data => {
    return applyFilters(search(data)).sort(compareNames);
  };

  // Get all areas that have students
  function getAreas() {
    // items[6] is area name
    return tbodyData
      .reduce((acc, student) => {
        if (student.items[6] && !acc.includes(student.items[6])) {
          acc.push(student.items[6]);
        }
        return acc;
      }, [])
      .sort();
  }

  // Get all sites that have students
  function getSites() {
    // items[1] is site name
    return tbodyData
      .reduce((acc, student) => {
        if (student.items[1] && !acc.includes(student.items[1])) {
          acc.push(student.items[1]);
        }
        return acc;
      }, [])
      .sort();
  }

  // Get all School Years with students
  function getSchoolYears() {
    // items[7] is school year
    return tbodyData
      .reduce((acc, student) => {
        if (student.items[7] && !acc.includes(student.items[7].slice(0, 7))) {
          acc.push(student.items[7].slice(0, 7));
        }
        return acc;
      }, [])
      .sort();
  }

  // Get all student grade levels
  function getGrades() {
    // items[2] is grade level
    return tbodyData
      .reduce((acc, student) => {
        if (student.items[2] && !acc.includes(student.items[2])) {
          acc.push(student.items[2]);
        }
        return acc;
      }, [])
      .sort();
  }

  return (
    <div className={styles['student-container']}>
      <div className={styles['ctrl-group']}>
        <div className={styles['inner-ctrl']} />
        <div className={styles['inner-ctrl']}>
          <div className={styles.search}>
            <InputGroup input={searchText} onChange={inputHandler}>
              <FormControl
                className={styles['search-bar']}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-icon"
              />
            </InputGroup>
          </div>
        </div>
        <div style={{ float: 'right' }}>
          <div className={styles['inner-ctrl']}>
            <Button className={styles['export-button']} variant="primary">
              Export to CSV
            </Button>
          </div>
          <div className={styles['inner-ctrl']}>
            <Button
              className={styles['filter-button']}
              variant="primary"
              onClick={() => setFilterModalIsOpen(true)}
            >
              Filter By <FaFilter cursor="pointer" />
            </Button>
            <AdminStudentFilter
              isOpen={filterModalIsOpen}
              setIsOpen={setFilterModalIsOpen}
              areas={getAreas()}
              sites={getSites()}
              years={getSchoolYears()}
              grades={getGrades()}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className={styles['inner-ctrl']}>
            <DropdownButton
              className={styles['dropdown-button']}
              id="dropdown-basic-button"
              title={`Sort By: ${sortBy}`}
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
      </div>
      <Table theadData={theadData} tbodyData={displayData(tbodyData)} sectionTitle="Students" />
    </div>
  );
};

export default AdminStudentsView;
