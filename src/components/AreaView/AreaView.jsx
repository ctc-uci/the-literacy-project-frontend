import { React, useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Card, DropdownButton, Dropdown, Button } from 'react-bootstrap';
import { BsPeople } from 'react-icons/bs';
import { TLPBackend, calculateScores, formatSchoolYear } from '../../common/utils';
import SitesTable from './sitesTable';
import styles from './AreaView.module.css';
import Graph from '../Graph/Graph';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import CSVButton from '../CSVButton/CSVButton';

const BackToAllAreas = () => {
  Navigate('/');
};

const AreaView = () => {
  const { areaId } = useParams();
  const [areaName, setAreaName] = useState('');
  const [testScores, setTestScores] = useState({});
  const [error, setError] = useState(null);
  const [areaStudentNum, setAreaStudentNum] = useState(0);
  const [areaMTNum, setAreaMTNum] = useState(0);
  const [areaSiteNum, setAreaSiteNum] = useState(0);
  const isValues = areaStudentNum === 0 && areaMTNum === 0 && areaSiteNum === 0;
  const [schoolYear, setSchoolYear] = useState('All');
  const [schoolYearChoices, setSchoolYearChoices] = useState([]);
  const [cycle, setCycle] = useState('All');
  const cycleChoices = ['All', 'Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];

  // Get all student school years for this area
  const getSchoolYears = data => {
    return data
      .reduce(
        (acc, student) => {
          if (student.year) {
            if (!acc.includes(student.year)) {
              acc.push(student.year);
            }
          }
          return acc;
        },
        ['All'],
      )
      .sort()
      .reverse();
  };

  // Gets area name from backend; sends user back if area ID is invalid
  useEffect(async () => {
    try {
      const res = await TLPBackend.get(`/areas/${areaId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.status === 200) {
        if (res.data.areaName == null || res.data.areaName === '') {
          BackToAllAreas();
        }
        setAreaName(res.data.areaName);

        // Get Site Count
        const { data: sitesCount } = await TLPBackend.get(`/sites/area/${areaId}`);
        setAreaSiteNum(sitesCount.length);

        // Get Unique Teacher Count
        const count = [];
        const userIds = [];
        sitesCount.map(async site => {
          const { data: siteTeachers } = await TLPBackend.get(`/teachers/site/${site.siteId}`);
          if (siteTeachers.length !== 0) {
            if (!userIds.includes(siteTeachers[0].userId)) {
              count.push(siteTeachers);
              userIds.push(siteTeachers[0].userId);
            }
          }
          setAreaMTNum([...new Set(count)].length);
        });
      } else {
        BackToAllAreas();
      }
    } catch (err) {
      BackToAllAreas();
    }

    async function fetchStudents() {
      const studentScoresRes = await TLPBackend.get(`/students/area/${areaId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (studentScoresRes.status === 200) {
        setTestScores(calculateScores(studentScoresRes.data));

        // Get Student Count
        setAreaStudentNum(studentScoresRes.data.length);
        setSchoolYearChoices(getSchoolYears(studentScoresRes.data));
      } else {
        setTestScores('');
        setError(error);
      }
    }
    fetchStudents();
  }, []);

  const updateSchoolYear = newSchoolYear => {
    setSchoolYear(newSchoolYear);

    // const schoolYearFilter =
    //   newSchoolYear === 'All' ? null : area => area.years && area.years.includes(newSchoolYear);

    // setFilters({
    //   ...filters,
    //   year: schoolYearFilter,
    // });
  };

  const updateCycle = newCycle => {
    setCycle(newCycle);
  };

  return (
    <div>
      <div className={styles.site_container}>
        <div className={styles.main_content}>
          <div className={styles.areas_breadcrumb}>
            <Link to="/" className={styles.all_areas_link}>
              Areas{' '}
            </Link>
            / {areaName}
          </div>
          <div className={styles.search_query_filters}>
            <div className={styles['school-year-container']}>
              <h3>School Year</h3>
              <DropdownButton
                variant="outline-secondary"
                title={schoolYear === 'All' ? schoolYear : formatSchoolYear(schoolYear)}
                className={styles['school-year-dropdown']}
              >
                {schoolYearChoices.map(year => (
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
            <div className={styles['cycle-container']}>
              <h3>Cycle</h3>
              <DropdownButton
                variant="outline-secondary"
                title={cycle === 'All' ? cycle : cycle}
                className={styles['cycle-dropdown']}
              >
                {cycleChoices.map(c => (
                  <Dropdown.Item
                    onClick={() => {
                      updateCycle(c);
                    }}
                    key={c}
                  >
                    {c === 'All' ? c : c}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
          <SitesTable areaId={Number.parseInt(areaId, 10)} year={schoolYear} cycle={cycle} />
        </div>
        {isValues ? (
          <div className="data">
            <Card className={styles.stats}>
              <p className={styles['area-card-title']}>{areaName} Data Overview</p>
              <div className={styles['area-card-info']}>
                <p>
                  <img
                    className={styles['area-dropdown__open__area_stats__section-icon']}
                    src={SchoolIcon}
                    alt="School Icon"
                  />
                  {areaSiteNum} Sites
                </p>
                <p>
                  <img
                    className={styles['area-dropdown__open__area_stats__section-icon']}
                    src={TeacherIcon}
                    alt="Teacher Icon"
                  />
                  {areaMTNum} Teachers
                </p>
                <p>
                  <BsPeople className={styles['area-mt-icon']} />
                  {areaStudentNum} Students
                </p>
              </div>
              <Button
                className={`btn btn-primary ${styles.empty_export_stats_to_csv_btn}`}
                disabled
              >
                Export to CSV
              </Button>
            </Card>
          </div>
        ) : (
          <div className="data">
            <Card className={styles.stats}>
              <p className={styles['area-card-title']}>{areaName} Data Overview</p>
              <div className={styles['area-card-info']}>
                <p>
                  <img
                    className={styles['area-dropdown__open__area_stats__section-icon']}
                    src={SchoolIcon}
                    alt="School Icon"
                  />
                  {areaSiteNum} Sites
                </p>
                <p>
                  <img
                    className={styles['area-dropdown__open__area_stats__section-icon']}
                    src={TeacherIcon}
                    alt="Teacher Icon"
                  />
                  {areaMTNum} Teachers
                </p>
                <p>
                  <BsPeople className={styles['area-mt-icon']} />
                  {areaStudentNum} Students
                </p>
              </div>
              <CSVButton type="area" areaId={Number.parseInt(areaId, 10)} />
            </Card>
            <div className={styles.graph_headings}>
              <p>{areaName}</p>
              <p>Year: 2021-22 Cycle: 1</p>
              <p>
                <strong>Average Growth in Reading</strong>
              </p>
            </div>
            <Card className={styles.graph}>
              <Graph
                xLabels={['Attitudinal', 'Academic']}
                preData={testScores.pre}
                postData={testScores.post}
              />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaView;
