import { React, useState, useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { BsPeople } from 'react-icons/bs';
import { TLPBackend, calculateScores } from '../../common/utils';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import SitesTable from './sitesTable';
import styles from './AreaView.module.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import Graph from '../Graph/Graph';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';

const BackToAllAreas = () => {
  Navigate('/area-management');
};

const AreaView = () => {
  const { areaId } = useParams();
  const [areaName, setAreaName] = useState('');
  const [testScores, setTestScores] = useState({});
  const [error, setError] = useState(null);

  // Gets area name from backend; sends user back if area ID is invalid
  useEffect(async () => {
    try {
      const res = await TLPBackend.get(`/areas/${areaId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(res);
      if (res.status === 200) {
        if (res.data.areaName == null || res.data.areaName === '') {
          BackToAllAreas();
        }
        setAreaName(res.data.areaName);
      } else {
        BackToAllAreas();
      }
    } catch (err) {
      // console.log(err);
      BackToAllAreas();
    }

    // const areaStudentScores = () => {
    //   fetch(TLPBackend.get(`/students`),
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   })
    //     .then(function(response){
    //       console.log(response)
    //       return response.json();
    //     })
    //     .then(function(myJson) {
    //       console.log(myJson);
    //       setTestScores(myJson)
    //     });
    // }
    const areaStudentScores = TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (areaStudentScores.status === 200) {
      setTestScores(calculateScores(areaStudentScores.data));
    } else {
      setTestScores('');
      setError(error);
    }
  }, []);

  const [schoolYear, setSchoolYear] = useState('2020-21');
  // const [schoolYearChoices, setSchoolYearChoices] = useState(['2020-21', '2019-20']);
  const schoolYearChoices = ['2020-21', '2019-20'];
  const [cycle, setCycle] = useState('Cycle 1');
  // const [cycleChoices, setCycleChoices] = useState(['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4']);
  const cycleChoices = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <NavigationBar />
      <div className={styles.site_container}>
        <div className={styles.main_content}>
          <div className={styles.areas_breadcrumb}>
            <Link to="/area-management" className={styles.all_areas_link}>
              Areas{' '}
            </Link>
            / {areaName}
          </div>
          <div className={styles.search_query_filters}>
            <div className={styles.select_school_year_container}>
              <h1 className={styles.school_year_header}>School Year</h1>
              <div className={styles.select_school_year}>
                <DropdownMenu
                  choices={schoolYearChoices}
                  current={schoolYear}
                  setFn={setSchoolYear}
                  innerClass={styles.search_option_dropdown_inner}
                />
              </div>
            </div>
            <div className={styles.select_cycle_container}>
              <h1 className={styles.cycle_header}>Cycle</h1>
              <div className={styles.select_cycle}>
                <DropdownMenu
                  choices={cycleChoices}
                  current={cycle}
                  setFn={setCycle}
                  innerClass={styles.search_option_dropdown_inner}
                />
              </div>
            </div>
            <div className={styles.search_sites_container}>
              <input
                type="text"
                className={styles.site_search_bar}
                placeholder="Search Sites"
                defaultValue={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button variant="primary" className={styles.site_search_button}>
                Search
              </Button>
            </div>
          </div>
          {/* <div className="site-container"> */}
          <SitesTable areaId={Number.parseInt(areaId, 10)} />
          {/* </div> */}
        </div>
        <div className="data">
          <div className={styles.sidebar_data_text}>
            <div>
              <h2>{areaName} Data</h2>
            </div>
            <Button className={`btn btn-primary ${styles.export_stats_to_csv_btn}`}>
              Export to CSV
            </Button>
          </div>
          <Card className={styles.stats}>
            <p>
              <BsPeople /> 0 Students
            </p>
            <p>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={TeacherIcon}
                alt="Teacher Icon"
              />
              0 Teachers
            </p>
            <p>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={SchoolIcon}
                alt="School Icon"
              />
              1 Sites
            </p>
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
      </div>
    </div>
  );
};

export default AreaView;
