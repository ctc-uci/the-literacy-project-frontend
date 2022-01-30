import './ManagementDataSection.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Table from '../Table/Table';
import InformationPopover from '../Popover/InformationPopover';

const ManagementDataSection = ({ sectionTitle, theadData, tbodyData, hasHeader, headerText }) => {
  let popover;
  if (hasHeader) {
    popover = <InformationPopover bodyText={headerText} />;
  } else {
    popover = null;
  }
  return (
    <div>
      <h1 style={{ height: 'calc(1.375rem + 1.5vw)' }}>
        {sectionTitle}
        {popover}
      </h1>
      <Button variant="primary">Add Existing {sectionTitle}</Button>
      <Button variant="warning">Create New {sectionTitle}</Button>
      <input type="text" placeholder={`Search ${sectionTitle}`} />
      <Table theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

ManagementDataSection.defaultProps = {
  sectionTitle: '',
  theadData: [],
  tbodyData: [],
  hasHeader: false,
  headerText: '',
};

ManagementDataSection.propTypes = {
  sectionTitle: PropTypes.string,
  theadData: PropTypes.arrayOf(PropTypes.object),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
  hasHeader: PropTypes.bool,
  headerText: PropTypes.string,
};

export default ManagementDataSection;
