import './ManagementDataSection.css';
import { React, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
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
        <h1 style={{ height: 'calc(1.375rem + 1.5vw)' }}>
          {sectionTitle}
          {popover}
        </h1>
      );
    }
    return null;
  };

  const displayCreateButton = () => {
    if (sectionTitle !== 'Students') {
      return (
        <Button variant="warning" onClick={clickManager}>
          Create New {sectionTitle}
        </Button>
      );
    }
    return null;
  };

  return (
    <div>
      {displaySectionTitle()}
      {displayCreateButton()}
      <input type="text" placeholder={`Search ${sectionTitle}`} />
      <Table theadData={theadData} tbodyData={tbodyData} tbodyColIsBadge={tbodyColIsBadge} />
      <CreateMasterTeacherModal
        isOpen={
          modalIsOpen === 'Master Teacher'
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
};

ManagementDataSection.propTypes = {
  sectionTitle: PropTypes.string,
  theadData: PropTypes.arrayOf(PropTypes.object),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
  hasHeader: PropTypes.bool,
  headerText: PropTypes.string,
  tbodyColIsBadge: PropTypes.arrayOf(PropTypes.number),
};

export default ManagementDataSection;
