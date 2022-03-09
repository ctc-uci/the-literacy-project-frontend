import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import SitesTable from './sitesTable';
import styles from './AreaView.module.css';
import Plus from '../../assets/icons/plus.svg';
import NavigationBarTwo from '../NavigationBarTwo/NavigationBarTwo';

// const AreaView = (areaName) => {
const AreaView = () => {
  const areaName = 'Irvine Unified School District';
  const [schoolYear, setSchoolYear] = useState('2020-21');
  // const [schoolYearChoices, setSchoolYearChoices] = useState(['2020-21', '2019-20']);
  const schoolYearChoices = ['2020-21', '2019-20'];
  const [cycle, setCycle] = useState('Cycle 1');
  // const [cycleChoices, setCycleChoices] = useState(['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4']);
  const cycleChoices = ['Cycle 1', 'Cycle 2', 'Cycle 3', 'Cycle 4'];
  const [searchQuery, setSearchQuery] = useState('');
  // console.log(searchQuery);

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
      </div>
    </div>
  );
};

export default AreaView;
