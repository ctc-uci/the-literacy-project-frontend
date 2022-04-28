import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';

// GET RID OF THIS EVENTUALLY
import styles from '../ManagementDataSection/ManagementDataSection.module.css';

const CSVButton = () => {
  const [setAreaResponseData] = useState([]);
  // const [siteResponseData, setSiteResponseData] = useState([]);
  const [studentResponseData, setStudentResponseData] = useState([]);

  const studentAreaHeaders = [
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

  const studentAreaData = studentResponseData.map(student => [
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

  const studentAreaCSVReport = {
    data: studentAreaData,
    headers: studentAreaHeaders,
    filename: 'Areas_Report.csv',
  };

  const addAssociatedSiteToArea = async resData => {
    async function fetchAllSites() {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resData) {
        TLPBackend.get(`/students/area/${element.areaId}`)
          .then(res => {
            studentResponseData.push(...res.data);
            setStudentResponseData(studentResponseData);
          })
          .catch(() => {
            /* TODO document why this arrow function is empty */
          });
      }
    }

    await fetchAllSites();
    setTimeout(() => {
      setAreaResponseData(resData);
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
      <CSVLink {...studentAreaCSVReport} className="csvLink">
        {/* <CSVLink {...siteCSVReport} className="csvLink"> */}
        Export to CSV
      </CSVLink>
    </Button>
  );
};

export default CSVButton;
