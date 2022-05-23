import React from 'react';
import PropTypes from 'prop-types';

import styles from './CommonTable.module.css';

const CommonTable = ({ children }) => {
  return <table className={styles['common-table']}>{children}</table>;
};

CommonTable.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CommonTable;
