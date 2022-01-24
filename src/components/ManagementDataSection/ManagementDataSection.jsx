import './ManagementDataSection.css';
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Table from '../Table/Table';

const ManagementDataSection = ({ sectionTitle, theadData, tbodyData }) => {
  return (
    <div>
      <h1>{sectionTitle}</h1>
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
};

ManagementDataSection.propTypes = {
  sectionTitle: PropTypes.string,
  theadData: PropTypes.arrayOf(PropTypes.string),
  tbodyData: PropTypes.arrayOf(PropTypes.string),
};

export default ManagementDataSection;
