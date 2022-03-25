import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../TableRow/TableRow';
import TableHead from '../TableHead/TableHead';
import './Table.css';

const Table = ({ theadData, tbodyData, tbodyColIsBadge, sectionTitle, statusCol }) => {
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
          return (
            <TableRow
              key={item.id}
              uniqueKey={item.id} // can't access by key in table row props
              data={item.items}
              colIsBadge={tbodyColIsBadge}
              sectionTitle={sectionTitle}
              statusCol={statusCol}
            />
          );
        })}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  theadData: [],
  tbodyData: [],
  tbodyColIsBadge: [],
  sectionTitle: '',
  statusCol: -1,
};

Table.propTypes = {
  theadData: PropTypes.arrayOf(
    PropTypes.shape({
      headerTitle: PropTypes.string,
      headerPopover: PropTypes.string,
    }),
  ),
  tbodyData: PropTypes.arrayOf(PropTypes.object),
  tbodyColIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
};

export default Table;
