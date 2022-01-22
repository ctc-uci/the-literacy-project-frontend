import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../TableRow/TableRow';
import TableHead from '../TableHead/TableHead';

const Table = ({ theadData, tbodyData }) => {
  return (
    <table>
      <thead>
        <tr>
          {theadData.map(h => {
            return <TableHead key={h} item={h} />;
          })}
        </tr>
      </thead>
      <tbody>
        {tbodyData.map(item => {
          return <TableRow key={item.id} data={item.items} />;
        })}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  theadData: [],
  tbodyData: [],
};

Table.propTypes = {
  theadData: PropTypes.arrayOf(PropTypes.string),
  tbodyData: PropTypes.arrayOf(PropTypes.string),
};

export default Table;
