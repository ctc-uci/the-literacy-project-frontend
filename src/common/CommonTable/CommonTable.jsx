import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommonTable.module.css';

const CommonTable = ({ children }) => {
  return (
    <table className={styles['common-table']}>
      <thead>
        <tr>Table Header 1</tr>
        <tr>Table Header 1</tr>
        <tr>Table Header 3</tr>
      </thead>
      <tbody>
        <tr>Table Row 1</tr>
        <tr>Table Row 2</tr>
        <tr>Table Row 3</tr>
      </tbody>
      {children}
    </table>
  );
};

CommonTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonTable;
