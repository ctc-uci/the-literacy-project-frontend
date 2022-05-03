import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton, InputGroup, FormControl } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import '../../custom.scss';
import '../../common/vars.css';
import styles from './admin-students-view.module.css';
import Table from '../../components/Table/Table';
import { TLPBackend, capitalize, formatSchoolYear } from '../../common/utils';

const AdminStudentsView = () => {
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('A-Z');
  const [searchText, setSearchText] = useState('');

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
      headerTitle: 'Home Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Ethnicity',
      headerPopover: '',
    },
    {
      headerTitle: 'Gender',
      headerPopover: '',
    },
    {
      headerTitle: 'Grade',
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
    tbodyData.push({
      id: studentObj.studentId,
      items: [
        `${lastName}, ${firstName}`,
        site,
        ht,
        eth,
        capitalize(gender),
        grade,
        area,
        schoolYearAndCycle,
        'View Scores',
      ],
    });
  });

  // Compares two names alphabetically
  const compareNames = (field1, field2) => {
    const f1 = field1.items[0].toLowerCase(); // items[0] gives the Name
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

  const displayData = data => {
    return search(data).sort(compareNames);
  };

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
            <Button className={styles['filter-button']} variant="primary">
              Filter By <FaFilter cursor="pointer" />
            </Button>
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
