import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CSVLink } from 'react-csv';
import { TLPBackend, calculateSingleStudentScores } from '../../common/utils';
import styles from './CSVButton.module.css';

const CSVButton = ({ type, areaId, siteId }) => {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const current = new Date();
  const date = `${current.getMonth() + 1}/${current.getDate()}/${current.getFullYear()}`;

  // const getAvg = arr => {
  //   if (arr === null) {
  //     return null;
  //   }
  //   let sum = 0;
  //   for (let i = 0; i < arr.length; i += 1) {
  //     sum += arr[i];
  //   }
  //   const avg = sum / arr.length;
  //   // round to 2 decimal places
  //   return Math.round((avg + Number.EPSILON) * 100) / 100;
  // };

  // Creates CSV file headers
  function createHeaders() {
    if (type === 'site') {
      return [
        'Site Name',
        'Area Name',
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
    if (type === 'admin') {
      return ['First Name', 'Last Name', 'Email', 'Phone Number'];
    }
    if (type === 'mt') {
      return ['First Name', 'Last Name', 'Email', 'Phone Number', 'Sites', 'Notes'];
    }
    if (['allAreas', 'student', 'area'].indexOf(type) !== -1) {
      return [
        'Area Name',
        'Site Name',
        'First Name',
        'Last Name',
        'Grade',
        'School Year',
        'Cycle',
        'Home Teacher',
        'Gender',
        'Ethnicity',
        'Student Group Name',
        'Pre-Test Academic (AVG)',
        'Pre-Test Attitudinal (AVG)',
        'Post-Test Academic (AVG)',
        'Post-Test Attitudinal (AVG)',
      ];
    }
    return [];
  }

  function mapResponse(resData) {
    if (type === 'site') {
      return [
        resData.siteName,
        resData.areaName,
        resData.addressStreet,
        resData.addressApt,
        resData.addressCity,
        resData.addressState,
        resData.addressZip,
        resData.primaryContactInfo.firstName,
        resData.primaryContactInfo.lastName,
        resData.primaryContactInfo.title,
        resData.primaryContactInfo.email,
        resData.primaryContactInfo.phone,
        resData.secondContactInfo.firstName,
        resData.secondContactInfo.lastName,
        resData.secondContactInfo.title,
        resData.secondContactInfo.email,
        resData.secondContactInfo.phone,
        resData.notes,
      ];
    }
    if (type === 'admin') {
      return resData.map(admin => [
        admin.firstName,
        admin.lastName,
        admin.email,
        admin.phoneNumber,
      ]);
    }
    if (type === 'mt') {
      const retList = [];
      resData.map(mt => {
        const l = [mt.firstName, mt.lastName, mt.email, mt.phoneNumber];
        const sites = [];
        if (mt.sites != null) {
          mt.sites.map(site => {
            sites.push(site.siteName);
            return site.siteName;
          });
        }
        l.push(sites);
        retList.push(l);
        return l;
      });
      return retList;
    }
    if (['allAreas', 'student', 'area'].indexOf(type) !== -1) {
      return resData.map(student => {
        const scores = calculateSingleStudentScores(student);
        return [
          student.areaName,
          student.siteName,
          student.firstName,
          student.lastName,
          student.grade,
          student.year,
          student.cycle,
          student.homeTeacher,
          student.gender,
          student.ethnicity,
          student.studentGroupName,
          // eslint-disable-next-line no-restricted-globals
          isNaN(scores.preAssessment) ? '' : `${scores.preAssessment.toFixed(2)}%`,
          // eslint-disable-next-line no-restricted-globals
          isNaN(scores.preAttitude) ? '' : `${scores.preAttitude.toFixed(2)}%`,
          // eslint-disable-next-line no-restricted-globals
          isNaN(scores.postAssessment) ? '' : `${scores.postAssessment.toFixed(2)}%`,
          // eslint-disable-next-line no-restricted-globals
          isNaN(scores.postAttitude) ? '' : `${scores.postAttitude.toFixed(2)}%`,
        ];
      });
    }
    return [];
  }

  const CSVReport = {
    data,
    headers: createHeaders(),
    filename: fileName,
  };

  const addData = async resData => {
    if (type === 'site') {
      const r = [];
      r.push(mapResponse(resData));
      setData(r);
    } else {
      setData(mapResponse(resData));
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (type === 'allAreas') {
        const res = await TLPBackend.get('/students');
        setFileName(`All_Areas_Report_${date}.csv`);
        addData(res.data);
      }
      if (type === 'admin') {
        const res = await TLPBackend.get('/admins');
        setFileName(`Admin_Data_${date}.csv`);
        addData(res.data);
      }
      if (type === 'mt') {
        const res = await TLPBackend.get('/teachers');
        setFileName(`MasterTeacher_Data_${date}.csv`);
        addData(res.data);
      }
      if (type === 'student') {
        const res = await TLPBackend.get('/students');
        setFileName(`Student_Data_${date}.csv`);
        addData(res.data);
      }
      if (type === 'area' && areaId) {
        const res = await TLPBackend.get(`/students/area/${areaId}`);
        const areaName = await TLPBackend.get(`/areas/${areaId}`);
        setFileName(`${areaName.data.areaName}_Report_${date}.csv`);
        addData(res.data);
      }
      if (type === 'site' && siteId) {
        const res = await TLPBackend.get(`/sites/${siteId}`);
        setFileName(`${res.data.siteName}_Data_${date}.csv`);
        addData(res.data);
      }
    }
    fetchData();
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
