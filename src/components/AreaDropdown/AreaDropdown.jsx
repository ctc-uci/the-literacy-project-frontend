import React, { useState } from 'react';
import './AreaDropdown.css';
import { BsFillCaretRightFill, BsPencil, BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import EditAreaModal from '../EditAreaModal/EditAreaModal';

function AreaDropdown({ areaId, areaName, areaStats, areaSites }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editAreaModalIsOpen, setEditAreaModalIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="area-dropdown">
      {isOpen ? (
        <div
          className="area-dropdown__open-container"
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter') toggleDropdown();
          }}
        >
          <div className="area-dropdown__open__area_stats">
            <div className="area-dropdown__open__area_stats__section">
              <BsPeople className="area-dropdown__open__area_stats__section-icon" />
              <p className="area-dropdown__open__area_stats__section-number">
                {areaStats.student_count} Students
              </p>
            </div>
            <div className="area-dropdown__open__area_stats__section">
              <img
                className="area-dropdown__open__area_stats__section-icon"
                src={TeacherIcon}
                alt="Teacher Icon"
              />
              <p className="area-dropdown__open__area_stats__section-number">
                {areaStats.master_teacher_count} Teachers
              </p>
            </div>
            <div className="area-dropdown__open__area_stats__section">
              <img
                className="area-dropdown__open__area_stats__section-icon"
                src={SchoolIcon}
                alt="School Icon"
              />
              <p className="area-dropdown__open__area_stats__section-number">
                {areaStats.site_count} Sites
              </p>
            </div>
          </div>
          <div className="area-dropdown__open__site-lookup-container">
            <div className="area-dropdown__open__site-lookup-wrapper">
              <div className="area-dropdown__open__site-lookup__header">Sites</div>
              <div className="area-dropdown__open__site-lookup__body">
                {areaSites.map(site => {
                  return (
                    <Link
                      className="area-dropdown__open__site-link"
                      to={`/site/${site.site_id}`}
                      key={`site-${site.site_id}`}
                    >
                      {site.site_name}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="area-dropdown__open__edit-sites-link">
            <Link to={`/site/${areaId}/edit`}>VIEW SITES</Link>
          </div>
        </div>
      ) : (
        <div className="area-dropdown__closed_container">
          <BsPencil
            role="button"
            onClick={() => setEditAreaModalIsOpen(true)}
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'Enter') setEditAreaModalIsOpen(true);
            }}
          />
          <div
            className="area-dropdown__closed-area-name-wrapper"
            onClick={toggleDropdown}
            role="button"
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'Enter') toggleDropdown();
            }}
          >
            <p className="area-dropdown__closed-area-name">{areaName}</p>
            <BsFillCaretRightFill className="area-dropdown__closed-area-caret" />
          </div>
        </div>
      )}
      <EditAreaModal
        areaId={areaId}
        areaName={areaName}
        isOpen={editAreaModalIsOpen}
        setIsOpen={setEditAreaModalIsOpen}
      />
    </div>
  );
}

AreaDropdown.defaultProps = {
  areaId: null,
  areaName: '',
  areaStats: {},
  areaSites: [],
};

AreaDropdown.propTypes = {
  areaId: PropTypes.number,
  areaName: PropTypes.string,
  // areaStats: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     student_count: PropTypes.number,
  //     master_teacher_count: PropTypes.number,
  //     site_count: PropTypes.number,
  //   }),
  // ),
  areaStats: PropTypes.oneOfType([PropTypes.object]),
  areaSites: PropTypes.arrayOf(PropTypes.object),
};

export default AreaDropdown;
