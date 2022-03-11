import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DropdownMenu from '../../common/DropdownMenu/DropdownMenu';
import Table from '../Table/Table';
import { TLPBackend } from '../../common/utils';
import styles from './AreaView.module.css';
import Plus from '../../assets/icons/plus.svg';

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
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
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
      headerTitle: 'Site Notes',
      headerPopover: '',
    },
    {
      headerTitle: 'Site Info',
      headerPopover: '',
    },
  ];

  // additionalInfo + siteNotes are static buttons to be put per row. TODO - make this dynamic
  const additionalInfo = (
    <button type="button" className="btn btn-primary">
      View Info
    </button>
  );
  const siteNotes = (
    <button type="button" className="btn btn-primary">
      View Note
    </button>
  );

  // teacherString returns a string that is used to display the master teacher's name
  const teacherString = teachersObj =>
    teachersObj.length > 0
      ? `${teachersObj[0].firstName} ${teachersObj[0].lastName}`
      : 'No Teacher Assigned';

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
              setFn={() => {}}
            />,
            site.siteName,
            teacherString(siteTeachers),
            siteNotes,
            additionalInfo,
          ],
        };
      }),
    );
    setTableData(res);
  };

  useEffect(async () => {
    buildTable();
  }, []);

  // Plugs table headers and data into ManagementDataSection
  return (
    <div>
      <div className={styles.tableButtons}>
        <Link to={`/sites/create/${areaId}`}>
          <button type="button" className="btn btn-warning">
            Create New Site
            <img className="plus__icon" src={Plus} alt="Plus Icon" />
          </button>
        </Link>
        {tableData.length !== 0 && (
          <>
            <input type="text" placeholder="Search" />
            <div className={styles.sort}>
              <button type="button" className="btn btn-primary">
                Sort By: A-Z
              </button>
            </div>
          </>
        )}
      </div>
      {tableData.length !== 0 ? (
        <Table theadData={theadData} tbodyData={tableData} hasHeader={false} />
      ) : (
        <div>
          <Col md={{ span: 6, offset: 3 }} className={styles.emptyArea}>
            <p>No sites have been created for this area yet. Click here to create</p>
          </Col>
        </div>
      )}
    </div>
  );
};

SitesTable.propTypes = {
  areaId: PropTypes.number.isRequired,
};

export default SitesTable;
