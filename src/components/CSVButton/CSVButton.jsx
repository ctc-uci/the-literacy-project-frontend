import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = props => {
  const [studentResponseData, setStudentResponseData] = useState([]);

  function createHeaders() {
    // Student Area Data
    if (props.type === 'area') {
      return [
        'Area ID',
        'Student ID',
        'First Name',
        'Last Name',
        'Grade',
        'Home Teacher',
        'Gender',
        'Ethnicity',
        'Student Group ID',
        'Post-Test A',
        'Post-Test A Notes',
        'Post-Test R',
        'Post-Test R Notes',
        'Pre-Test A',
        'Pre-Test A Notes',
        'Pre-Test R',
        'Pre-Test R Notes',
      ];
    }
    return [];
  }

  // eslint-disable-next-line consistent-return
  function mapResponse() {
    if (props.type === 'area') {
      return studentResponseData.map(student => [
        student.areaId,
        student.studentId,
        student.firstName,
        student.lastName,
        student.grade,
        student.homeTeacher,
        student.gender,
        student.ethnicity,
        student.studentGroupId,
        student.posttestA,
        student.posttestANotes,
        student.posttestR,
        student.posttestRNotes,
        student.pretestA,
        student.pretestANotes,
        student.pretestR,
        student.pretestRNotes,
      ]);
    }
  }

  const CSVReport = {
    data: studentResponseData,
    headers: createHeaders(),
    filename: 'Areas_Report.csv',
  };

  const addAssociatedSiteToArea = async resData => {
    async function fetchAllSites() {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resData) {
        TLPBackend.get(`/students/area/${element.areaId}`)
          .then(res => {
            res.data.forEach(student => {
              // eslint-disable-next-line no-param-reassign
              student.areaId = element.areaId;
            });
            if (res.data.length !== 0) {
              studentResponseData.push(...res.data);
            }
          })
          .catch(() => {
            /* TODO document why this arrow function is empty */
          });
      }
    }

    await fetchAllSites();
    setTimeout(() => {
      setStudentResponseData(mapResponse());
    }, 2000);
  };

  useEffect(() => {
    async function fetchAreas() {
      await TLPBackend.get('/areas')
        .then(res => {
          setTimeout(() => {
            addAssociatedSiteToArea(res.data);
          }, 1000);
        })
        .catch(() => {});
    }

    fetchAreas();
  }, []);

  return (
    <Button className={styles['export-button']} variant="primary">
      <CSVLink {...CSVReport} className={styles.csvLink}>
        Export to CSV
      </CSVLink>
    </Button>
  );
};

CSVButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default CSVButton;
