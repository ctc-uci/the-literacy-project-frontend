import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { FaPlus, FaFilter } from 'react-icons/fa';
import '../../custom.scss';
import styles from './ManagementDataSection.module.css';
import Table from '../Table/Table';
import InformationPopover from '../Popover/InformationPopover';
import CreateMasterTeacherModal from '../CreateMasterTeacherModal/CreateMasterTeacherModal';
import CreateAdminModal from '../CreateAdminModal/CreateAdminModal';

const ManagementDataSection = ({
  sectionTitle,
  theadData,
  tbodyData,
  hasHeader,
  headerText,
  tbodyColIsBadge,
  statusCol,
}) => {
  let popover;
  if (hasHeader) {
    popover = <InformationPopover bodyText={headerText} />;
  } else {
    popover = null;
  }
  const [modalIsOpen, setModalOpen] = useState('');

  const pageRedirect = () => {
    if (sectionTitle === 'Sites') {
      window.location.href = '/sites/create';
    }
  };
  const clickManager = () => {
    setModalOpen(sectionTitle);
    pageRedirect();
  };

  const displaySectionTitle = () => {
    if (sectionTitle !== 'Students') {
      return (
        <>
          <h1 className={styles['inner-ctrl']} style={{ height: 'calc(1.375rem + 1.5vw)' }}>
            {sectionTitle}
            {popover}
          </h1>
          <Button className={styles['export-button']} variant="primary">
            Export to CSV
          </Button>
        </>
      );
    }
    return null;
  };

  const displayCreateButton = () => {
    if (sectionTitle !== 'Students') {
      return (
        <Button variant="warning" onClick={clickManager}>
          Create New {sectionTitle} <FaPlus cursor="pointer" />
        </Button>
      );
    }
    return null;
  };

  const displayFilterButton = () => {
    if (sectionTitle !== 'Admin') {
      return (
        <Button className={styles['filter-button']} variant="primary">
          Filter By <FaFilter cursor="pointer" />
        </Button>
      );
    }
    return null;
  };

  const displaySortByButton = () => {
    return (
      <DropdownButton
        className={styles['dropdown-button']}
        id="dropdown-basic-button"
        title="Sort By"
      >
        <Dropdown.Item>A-Z</Dropdown.Item>
        <Dropdown.Item>Z-A</Dropdown.Item>
        <Dropdown.Item>OLD TO NEW</Dropdown.Item>
        <Dropdown.Item>NEW TO OLD</Dropdown.Item>
      </DropdownButton>
    );
  };

  return (
    <div>
      {displaySectionTitle()}
      <div className={styles['ctrl-group']}>
        <div className={styles['inner-ctrl']}>{displayCreateButton()}</div>
        <div className={styles['inner-ctrl']}>
          <input type="text" placeholder={`Search ${sectionTitle}`} />
        </div>
        <div style={{ float: 'right' }}>
          <div className={styles['inner-ctrl']}>{displayFilterButton()}</div>
          <div className={styles['inner-ctrl']}>{displaySortByButton()}</div>
        </div>
      </div>
      <Table
        theadData={theadData}
        tbodyData={tbodyData}
        tbodyColIsBadge={tbodyColIsBadge}
        sectionTitle={sectionTitle}
        statusCol={statusCol}
      />
      <CreateMasterTeacherModal
        isOpen={
          modalIsOpen === 'Master Teachers'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
      />
      <CreateAdminModal
        isOpen={
          modalIsOpen === 'Admin'
        } /* Since this is a generic section, you must first check the sectionTitle to ensure that the correct modal is triggered */
        setIsOpen={setModalOpen}
      />
    </div>
  );
};

ManagementDataSection.defaultProps = {
  sectionTitle: '',
  theadData: [],
  tbodyData: [],
  hasHeader: false,
  headerText: '',
  tbodyColIsBadge: [],
  statusCol: -1,
};

ManagementDataSection.propTypes = {
  sectionTitle: PropTypes.string,
  theadData: PropTypes.arrayOf(PropTypes.object),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
  hasHeader: PropTypes.bool,
  headerText: PropTypes.string,
  tbodyColIsBadge: PropTypes.arrayOf(PropTypes.number),
  statusCol: PropTypes.number,
};

export default ManagementDataSection;
