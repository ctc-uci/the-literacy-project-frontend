import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ data }) => {
  return (
    <tr>
      {data.map(item => {
        return <td key={item}>{item}</td>;
      })}
    </tr>
  );
};

TableRow.defaultProps = {
  data: [],
};

TableRow.propTypes = {
  data: PropTypes.arrayOf(),
};

export default TableRow;
