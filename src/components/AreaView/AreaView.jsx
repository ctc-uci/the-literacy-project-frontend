import { React, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TLPBackend } from '../../common/utils';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import SitesTable from './sitesTable';
import './AreaView.module.css';
import Plus from '../../assets/icons/plus.svg';

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
