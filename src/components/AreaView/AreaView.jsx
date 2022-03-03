import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import './AreaView.module.css';
import Plus from '../../assets/icons/plus.svg';

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
  console.log(searchQuery);

  return (
    <div>
      <h1>
        <Link to="/area-management" className="all-areas-breadcrumb">
          Areas{' '}
        </Link>
        / {areaName}
      </h1>
      <div className="search-query-filters">
        <div className="select-school-year">
          School Year
          <DropdownMenu choices={schoolYearChoices} current={schoolYear} setFn={setSchoolYear} />
        </div>
        <div className="select-school-year">
          Cycle
          <DropdownMenu choices={cycleChoices} current={cycle} setFn={setCycle} />
        </div>
        <h2> Cycle: {cycle} </h2>
        <div className="site-search-bar">
          <input
            type="text"
            placeholder="Search sites"
            defaultValue={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <div> Search </div>
        </div>

        <Link to="/sites/create">
          <button type="button" className="btn btn-warning">
            Create New Site
            <img className="plus__icon" src={Plus} alt="Plus Icon" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AreaView;
