import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsJournalText, BsPlus, BsFilter } from 'react-icons/bs';
import { TLPBackend } from '../../common/utils';

import styles from './sitesTable.module.css';

import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import Table from '../Table/Table';
import NotesModal from '../NotesModal/NotesModal';

// TODO: seperate data from components
// Combining components and data into a single object
// to be passed elsewhere is messy, just pass the data
// to a component that can render everything

const SitesTable = ({ areaId }) => {
  const statusChoices = ['Active', 'Inactive'];

  // Table headers
  const theadData = [
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This site is currently actively participating in the TLP program.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This site is currently not participating in the TLP program. Data is still available to view from past cycles.</p>",
    },
    {
      headerTitle: 'Site Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Master Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Notes',
      headerPopover: '',
    },
    {
      headerTitle: 'Site Info',
      headerPopover: '',
    },
  ];

  const [modalShow, setModalShow] = useState(false);
  const [currSite, setCurrSite] = useState(0);

  // additionalInfo + siteNotes are static buttons to be put per row. TODO - make this dynamic
  const additionalInfo = siteId => (
    <Link to={`/sites/${siteId}`}>
      <button type="button" className={`btn btn-primary ${styles.view_site_info_btn}`}>
        View Info
      </button>
    </Link>
  );

  const showNote = site => {
    setCurrSite(site);
    setModalShow(true);
  };

  // teacherString returns a string that is used to display the master teacher's name
  const teacherString = teachersObj =>
    teachersObj.length > 0 ? (
      `${teachersObj[0].firstName} ${teachersObj[0].lastName}`
    ) : (
      <span className={styles.no_teacher_assigned}>No Teacher Assigned</span>
    );

  // Callback for setting site active status
  const updateSiteStatus = async (newChoice, site) => {
    const newStatus = newChoice === 'Active';
    await TLPBackend.put(`/sites/${site.siteId}`, {
      active: newStatus,
    });
  };

  const [tableData, setTableData] = useState([]);
  const buildTable = async () => {
    const { data: fetchedSites } = await TLPBackend.get(`/sites/area/${areaId}`);
    // For each site, get teachers
    const res = await Promise.all(
      fetchedSites.map(async site => {
        // console.log(site);
        const { data: siteTeachers } = await TLPBackend.get(`/teachers/site/${site.siteId}`);
        return {
          id: site.siteId,
          items: [
            <DropdownMenu
              key={site.siteId}
              choices={statusChoices}
              current={site.active ? 'Active' : 'Inactive'}
              setFn={newChoice => {
                updateSiteStatus(newChoice, site);
              }}
              innerClass={styles.site_dropdown_inner}
              buttonClass={`${styles.site_dropdown_button} ${
                site.active ? styles.active_site_dd : ''
              }`}
            />,
            site.siteName,
            teacherString(siteTeachers),
            <BsJournalText
              key={site.siteId}
              onClick={() => showNote(site.siteId)}
              className={styles.notes_icon}
            />,
            additionalInfo(site.siteId),
          ],
        };
      }),
    );
    setTableData(res);
  };

  useEffect(async () => {
    buildTable();
  }, []);

  return (
    <div>
      {/* creates the functionality above the table */}
      <div className={styles.tableButtons}>
        <Link to={`/sites/create/${areaId}`}>
          <button type="button" className={`btn btn-warning ${styles.create_site_btn}`}>
            Create New Site
            <BsPlus className={styles.create_button_plus} />
          </button>
        </Link>
        {tableData.length !== 0 && (
          <>
            <input type="text" className={styles.sites_filter_input} placeholder="Search" />
            {/* TODO: Will need different sorts for these filter/sort buttons */}
            <div className={styles.sort}>
              <button type="button" className={`btn btn-primary ${styles.filter_by_btn}`}>
                Filter By
                <BsFilter className={styles.filter_by_icon} />
              </button>
              <button type="button" className={`btn btn-primary ${styles.sort_by_btn}`}>
                Sort By: A-Z
              </button>
            </div>
          </>
        )}
      </div>
      {tableData.length !== 0 ? (
        // Plugs table headers and data into Table
        <Table theadData={theadData} tbodyData={tableData} />
      ) : (
        <div className={styles.arrow}>
          <Col md={{ span: 7, offset: 1 }} className={styles.emptyArea}>
            <p>No sites have been created for this area yet. Click here to create</p>
          </Col>
        </div>
      )}
      <NotesModal isOpen={modalShow} setIsOpen={setModalShow} siteId={currSite} />
    </div>
  );
};

SitesTable.propTypes = {
  areaId: PropTypes.number.isRequired,
};

export default SitesTable;
