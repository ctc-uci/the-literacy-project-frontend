import React from 'react';
import PropTypes from 'prop-types';
import TableRow from '../TableRow/TableRow';
import TableHead from '../TableHead/TableHead';
import styles from './Table.module.css';

const Table = ({ theadData, tbodyData, tbodyColIsBadge, sectionTitle, statusCol }) => {
  return (
    <table className={styles.table}>
      <thead className={styles['table-head']}>
        <tr className={styles['table-head']}>
          {theadData.map((h, ind) => {
            // eslint-disable-next-line react/no-array-index-key
            return <TableHead key={ind} item={h} />;
          })}
        </tr>
      </thead>
      <tbody className={styles['table-body']}>
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
  tbodyData: PropTypes.arrayOf(PropTypes.shape({})),
  tbodyColIsBadge: PropTypes.arrayOf(PropTypes.number),
  sectionTitle: PropTypes.string,
  statusCol: PropTypes.number,
};

export default Table;
