import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { TLPBackend } from '../../common/utils';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import SitesTable from './sitesTable';
import styles from './AreaView.module.css';
import Plus from '../../assets/icons/plus.svg';
import NavigationBarTwo from '../NavigationBarTwo/NavigationBarTwo';

const BackToAllAreas = () => {
  window.location.replace('/area-management');
};

const AreaView = () => {
  const { areaId } = useParams();
  const [areaName, setAreaName] = useState('');

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
      <NavigationBarTwo />
      <div className={styles.site_container}>
        <div>
          <h1>
            <Link to="/area-management" className={styles.all_areas_breadcrumb}>
              Areas{' '}
            </Link>
            / {areaName}
          </h1>
          <div className={styles.search_query_filters}>
            <h1>School Year</h1>
            <div className={styles.select_school_year}>
              <DropdownMenu
                choices={schoolYearChoices}
                current={schoolYear}
                setFn={setSchoolYear}
              />
            </div>
            <h2>Cycle</h2>
            <div className={styles.select_school_year}>
              <DropdownMenu choices={cycleChoices} current={cycle} setFn={setCycle} />
            </div>
            <div className="site-search-bar">
              <input
                type="text"
                placeholder="Search Sites"
                defaultValue={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button variant="primary">Search</Button>
            </div>
          </div>
          <div>
            <Link to="/sites/create">
              <button type="button" className="btn btn-warning">
                Create New Site
                <img className="plus__icon" src={Plus} alt="Plus Icon" />
              </button>
            </Link>
          </div>

          <div className="sites-table-container">
            <SitesTable />
          </div>
        </div>
        <div className="data">
          <Button variant="primary">Export to CSV</Button>
          <h2>Data</h2>
          <h3>Average Scores</h3>
          {/* placeholder for graph */}
          <Card className="graph" />
          <Card className="stats">
            <p># Students</p>
            <p># Teachers</p>
            <p># Sites</p>
          </Card>
        </div>

        <Link to={`/sites/create/${areaId}`}>
          <button type="button" className="btn btn-warning">
            Create New Site
            <img className="plus__icon" src={Plus} alt="Plus Icon" />
          </button>
        </Link>
      </div>

      <div className="sites-table-container">
        <SitesTable areaId={Number.parseInt(areaId, 10)} />
      </div>
    </div>
  );
};

export default AreaView;
