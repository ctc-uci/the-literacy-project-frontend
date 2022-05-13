import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = ({ type, areaId, siteId }) => {
  const [studentResponseData, setStudentResponseData] = useState([]);
  const [fileName, setFileName] = useState('');

  // Creates CSV file headers
  function createHeaders() {
    if (type === 'site') {
      return [
        'Site Name',
        'Area Name',
        'Site Status',
        'Addresss Line',
        'Apt, suite, etc.',
        'City',
        'State',
        'ZIP Code',
        'First Name (Primary Contact)',
        'Last Name (Primary Contact)',
        'Title (Primary Contact)',
        'Email (Primary Contact)',
        'Phone Number (Primary Contact)',
        'First Name (Secondary Contact)',
        'Last Name (Secondary Contact)',
        'Title (Secondary Contact)',
        'Email (Secondary Contact)',
        'Phone Number (Secondary Contact)',
        'Notes',
      ];
    }

    return [
      'Area Name',
      'Site Name',
      'First Name',
      'Last Name',
      'Grade',
      'Home Teacher',
      'Gender',
      'Ethnicity',
      'Student Group Name',
      'Pre-Test Academic',
      'Pre-Test Attitudinal',
      'Post-Test Academic',
      'Post-Test Attitudinal',
    ];
  }

  function mapResponse() {
    if (type === 'site') {
      // console.log('in map response', studentResponseData);
      return studentResponseData.map(student => [
        student.siteName,
        student.areaName,
        student.active,
        student.addressStreet,
        student.addressApt,
        student.addressCity,
        student.addressState,
        student.addressZip,
        student.primaryContactInfo.firstName,
        student.primaryContactInfo.lastName,
        student.primaryContactInfo.title,
        student.primaryContactInfo.email,
        student.primaryContactInfo.phone,
        student.secondContactInfo.firstName,
        student.secondContactInfo.lastName,
        student.secondContactInfo.title,
        student.secondContactInfo.email,
        student.secondContactInfo.phone,
        student.notes,
      ]);
    }

    return studentResponseData.map(student => [
      student.areaName,
      student.siteName,
      student.firstName,
      student.lastName,
      student.grade,
      student.homeTeacher,
      student.gender,
      student.ethnicity,
      student.studentGroupName,
      student.pretestA,
      student.pretestR,
      student.posttestA,
      student.posttestR,
    ]);
  }

  const CSVReport = {
    data: studentResponseData,
    headers: createHeaders(),
    filename: fileName,
  };

  const addAssociatedSiteToArea = async resData => {
    async function fetchStudents() {
      studentResponseData.push(...resData);
    }

    await fetchStudents();
    setTimeout(() => {
      setStudentResponseData(mapResponse());
    }, 1000);
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        if (type === 'allAreas') {
          const areasResponse = await TLPBackend.get('/students');
          setFileName('All_Areas.csv');
          addAssociatedSiteToArea(areasResponse.data);
        }
        if (type === 'area' && areaId) {
          const sitesResponse = await TLPBackend.get(`/students/area/${areaId}`);
          const areaName = await TLPBackend.get(`/areas/${areaId}`);
          setFileName(`${areaName.data.areaName}_Report.csv`);
          addAssociatedSiteToArea(sitesResponse.data);
        }
        if (type === 'site' && siteId) {
          const siteResponse = await TLPBackend.get(`/sites/${siteId}`);
          // console.log(siteResponse.data);
          setFileName(`${siteResponse.data.siteName}_Data.csv`);
          addAssociatedSiteToArea(siteResponse.data);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchStudents();
  }, []);

  return (
    <CSVLink {...CSVReport} className={styles.csvLink}>
      <Button
        className={type === 'site' ? styles['site-export'] : styles['export-button']}
        variant="primary"
      >
        {type === 'site' ? 'Export' : 'Export to CSV'}
      </Button>
    </CSVLink>
  );
};

CSVButton.propTypes = {
  type: PropTypes.string.isRequired,
  // eslint-disable-next-line react/require-default-props
  areaId: PropTypes.number,
  // eslint-disable-next-line react/require-default-props
  siteId: PropTypes.number,
};

export default CSVButton;
