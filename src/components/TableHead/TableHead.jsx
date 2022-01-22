import React from 'react';
import PropTypes from 'prop-types';

const TableHead = ({ item }) => {
  return <td title={item}>{item}</td>;
};

TableHead.defaultProps = {
  item: [],
};

TableHead.propTypes = {
  item: PropTypes.arrayOf(),
};

export default TableHead;
