import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = ({ type, areaID, siteID }) => {
  const [studentResponseData, setStudentResponseData] = useState([]);

  // Creates CSV file headers
  function createHeaders() {
    if (type === 'allAreas') {
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
    if (type === 'area') {
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
    if (type === 'site') {
      return [
        'Site ID',
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

  function mapResponse() {
    if (type === 'allAreas') {
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
    if (type === 'area') {
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
    if (type === 'site') {
      return studentResponseData.map(student => [
        student.siteId,
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
    return [];
  }

  const CSVReport = {
    data: studentResponseData,
    headers: createHeaders(),
    filename: 'Areas_Report.csv',
  };

  const addAssociatedSiteToArea = async resData => {
    async function fetchStudentsByAllAreas() {
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

    async function fetchStudentsByArea() {
      // eslint-disable-next-line no-restricted-syntax
      for (const element of resData) {
        TLPBackend.get(`/students/site/${element.siteId}`)
          .then(res => {
            res.data.forEach(student => {
              // eslint-disable-next-line no-param-reassign
              student.areaId = areaID;
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

    async function fetchStudentsBySite() {
      resData.forEach(student => {
        // eslint-disable-next-line no-param-reassign
        student.siteId = siteID;
      });
      if (resData.length !== 0) {
        studentResponseData.push(...resData);
      }
    }

    if (type === 'allAreas') {
      await fetchStudentsByAllAreas();
    }
    if (type === 'area') {
      await fetchStudentsByArea();
    }
    if (type === 'site') {
      await fetchStudentsBySite();
    }
    setTimeout(() => {
      setStudentResponseData(mapResponse());
    }, 2000);
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        if (type === 'allAreas') {
          const areasResponse = await TLPBackend.get('/areas');
          addAssociatedSiteToArea(areasResponse.data);
        }
        if (type === 'area') {
          const sitesResponse = await TLPBackend.get(`/sites/area/${areaID}`);
          addAssociatedSiteToArea(sitesResponse.data);
        }
        if (type === 'site') {
          const siteResponse = await TLPBackend.get(`/students/site/${siteID}`);
          addAssociatedSiteToArea(siteResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchStudents();
  }, []);

  return (
    <Button
      className={type === 'site' ? styles['site-export'] : styles['export-button']}
      variant="primary"
    >
      <CSVLink {...CSVReport} className={styles.csvLink}>
        {type === 'site' ? 'Export' : 'Export to CSV'}
      </CSVLink>
    </Button>
  );
};

CSVButton.propTypes = {
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  areaID: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  siteID: PropTypes.number,
};

export default CSVButton;
