import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../TableRow/TableRow';
import TableHead from '../TableHead/TableHead';
import './Table.css';

const Table = ({ theadData, tbodyData }) => {
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-head">
          {theadData.map(h => {
            return <TableHead key={h} item={h} />;
          })}
        </tr>
      </thead>
      <tbody className="table-body">
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
  theadData: PropTypes.arrayOf(
    PropTypes.shape({
      headerTitle: PropTypes.string,
      headerPopover: PropTypes.string,
    }),
  ),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
