import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './StudentTable.module.css';

const StudentTable = ({ data }) => {
  const headers = ['Name', 'Area', 'Site Name', ''];
  return (
    <table className="table">
      <thead className="table-head">
        <tr className="table-head">
          {headers.map(h => {
            return (
              <td className={styles['table-heading']} key={h}>
                <h5>{h}</h5>
              </td>
            );
          })}
        </tr>
      </thead>
      <tbody className="table-body">
        {data.map(s => {
          return (
            <tr key={s.studentId}>
              <td>
                <h6>{`${s.firstName} ${s.lastName}`}</h6>
              </td>
              <td>
                <h6>{s.areaName}</h6>
              </td>
              <td>
                <h6>{s.siteName}</h6>
              </td>
              <td className={styles['view-group-col']}>
                <Link to={`/student/${s.studentId}`}>
                  <Button className={styles['view-profile-btn']}>View Profile</Button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

StudentTable.defaultProps = {
  data: [],
};

StudentTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default StudentTable;
