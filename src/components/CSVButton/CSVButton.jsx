import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = ({ type, areaId, siteId }) => {
  const [studentResponseData, setStudentResponseData] = useState([]);
  // const [siteInfo, setSiteInfo] = useState({});
  // const [fileName, setFileName] = useState('');

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
      // console.log(siteInfo);
      return [];
      // return [
      //   siteInfo.siteName,
      //   siteInfo.areaName,
      //   siteInfo.active,
      //   siteInfo.addressStreet,
      //   siteInfo.addressApt,
      //   siteInfo.addressCity,
      //   siteInfo.addressState,
      //   siteInfo.addressZip,
      //   siteInfo.primaryContactInfo.firstName,
      //   siteInfo.primaryContactInfo.lastName,
      //   siteInfo.primaryContactInfo.title,
      //   siteInfo.primaryContactInfo.email,
      //   siteInfo.primaryContactInfo.phone,
      //   siteInfo.secondContactInfo.firstName,
      //   siteInfo.secondContactInfo.lastName,
      //   siteInfo.secondContactInfo.title,
      //   siteInfo.secondContactInfo.email,
      //   siteInfo.secondContactInfo.phone,
      //   siteInfo.notes,
      // ];
    }

    console.log(studentResponseData);
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
    filename: `Area_Report.csv`,
  };

  const addAssociatedSiteToArea = async resData => {
    // let name;
    async function fetchStudents() {
      studentResponseData.push(...resData);
      // if (type === 'area' && resData) {
      //   name = resData[0].areaName;
      // }
    }

    async function fetchSites() {
      // siteInfo.push(...resData);
      // name = siteInfo.siteName;
    }

    if (type === 'site') {
      fetchSites();
    } else {
      await fetchStudents();
    }
    setTimeout(() => {
      setStudentResponseData(mapResponse());
      // if (type === 'site') {
      //   setSiteInfo(mapResponse());
      // } else {
      //   setStudentResponseData(mapResponse());
      // }

      // setFileName(name);
    }, 1000);
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        if (type === 'allAreas') {
          const areasResponse = await TLPBackend.get('/students');
          addAssociatedSiteToArea(areasResponse.data);
          // setSiteInfo('Full_Report');
        }
        if (type === 'area' && areaId) {
          const sitesResponse = await TLPBackend.get(`/students/area/${areaId}`);
          addAssociatedSiteToArea(sitesResponse.data);
        }
        if (type === 'site' && siteId) {
          const siteResponse = await TLPBackend.get(`/sites/${siteId}`);
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
