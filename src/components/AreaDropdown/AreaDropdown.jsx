import React, { useState } from 'react';
import { BsFillCaretDownFill, BsFillCaretRightFill, BsPencil, BsPeople } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './AreaDropdown.module.css';
import SchoolIcon from '../../assets/icons/school.svg';
import TeacherIcon from '../../assets/icons/Teacher.svg';
import EditAreaModal from '../EditAreaModal/EditAreaModal';

function AreaDropdown({
  areaId,
  areaActive,
  areaName,
  areaState,
  areaStats,
  areaSites,
  editable,
  hideSitesLink,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [editAreaModalIsOpen, setEditAreaModalIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['area-dropdown']}>
      <div className={styles['area-dropdown__closed_container']}>
        {editable && (
          <BsPencil
            role="button"
            onClick={() => setEditAreaModalIsOpen(true)}
            tabIndex={0}
            onKeyDown={event => {
              if (event.key === 'Enter') setEditAreaModalIsOpen(true);
            }}
          />
        )}
        <div
          className={styles['area-dropdown__closed-area-name-wrapper']}
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter') toggleDropdown();
          }}
        >
          <p className={styles['area-dropdown__closed-area-name']}>{areaName}</p>
          {isOpen ? (
            <BsFillCaretDownFill className={styles['area-dropdown__closed-area-caret']} />
          ) : (
            <BsFillCaretRightFill className={styles['area-dropdown__closed-area-caret']} />
          )}
        </div>
      </div>
      {isOpen && (
        <div
          className={styles['area-dropdown__open-container']}
          onClick={toggleDropdown}
          role="button"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Enter') toggleDropdown();
          }}
        >
          <div className={styles['area-dropdown__open__area_stats']}>
            <div className={styles['area-dropdown__open__area_stats__section']}>
              <BsPeople className={styles['area-dropdown__open__area_stats__section-icon']} />
              <p className={styles['area-dropdown__open__area_stats__section-number']}>
                {areaStats.student_count} Students
              </p>
            </div>
            <div className={styles['area-dropdown__open__area_stats__section']}>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={TeacherIcon}
                alt="Teacher Icon"
              />
              <p className={styles['area-dropdown__open__area_stats__section-number']}>
                {areaStats.master_teacher_count} Teachers
              </p>
            </div>
            <div className={styles['area-dropdown__open__area_stats__section']}>
              <img
                className={styles['area-dropdown__open__area_stats__section-icon']}
                src={SchoolIcon}
                alt="School Icon"
              />
              <p className={styles['area-dropdown__open__area_stats__section-number']}>
                {areaStats.site_count} Sites
              </p>
            </div>
          </div>
          <div className={styles['area-dropdown__open__site-lookup-container']}>
            <div className={styles['area-dropdown__open__site-lookup-wrapper']}>
              <div className={styles['area-dropdown__open__site-lookup__header']}>Sites</div>
              <div className={styles['area-dropdown__open__site-lookup__body']}>
                {areaSites.map(site => {
                  return (
                    <Link
                      className={styles['area-dropdown__open__site-link']}
                      to={`/sites/${site.siteId}`}
                      key={`site-${site.siteId}`}
                    >
                      {site.siteName}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          {!hideSitesLink && (
            <div className={styles['area-dropdown__open__edit-sites-link']}>
              <Link to={`/area/${areaId}`}>VIEW ALL</Link>
            </div>
          )}
        </div>
      )}
      <EditAreaModal
        areaId={areaId}
        areaActive={areaActive}
        areaName={areaName}
        areaState={areaState}
        isOpen={editAreaModalIsOpen}
        setIsOpen={setEditAreaModalIsOpen}
      />
    </div>
  );
}

AreaDropdown.defaultProps = {
  areaId: null,
  areaActive: false,
  areaName: '',
  areaState: '',
  areaStats: {},
  areaSites: [],
  editable: true,
  hideSitesLink: false,
};

AreaDropdown.propTypes = {
  areaId: PropTypes.number,
  areaName: PropTypes.string,
  areaState: PropTypes.string,
  areaActive: PropTypes.bool,
  // areaStats: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     student_count: PropTypes.number,
  //     master_teacher_count: PropTypes.number,
  //     site_count: PropTypes.number,
  //   }),
  // ),
  areaStats: PropTypes.oneOfType([PropTypes.object]),
  areaSites: PropTypes.arrayOf(PropTypes.object),
  editable: PropTypes.bool,
  hideSitesLink: PropTypes.bool,
};

export default AreaDropdown;
