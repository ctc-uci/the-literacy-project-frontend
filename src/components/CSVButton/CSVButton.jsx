import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = () => {
  const [studentResponseData, setStudentResponseData] = useState([]);

  const studentAreaHeaders = [
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

  function mapStudents() {
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

  const studentAreaCSVReport = {
    data: studentResponseData,
    headers: studentAreaHeaders,
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
      setStudentResponseData(mapStudents());
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
      <CSVLink {...studentAreaCSVReport} className={styles.csvLink}>
        Export to CSV
      </CSVLink>
    </Button>
  );
};

export default CSVButton;
