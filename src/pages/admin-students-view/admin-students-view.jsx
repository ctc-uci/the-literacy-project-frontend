import React, { useState, useEffect } from 'react';
import styles from './admin-students-view.module.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import { TLPBackend, capitalize, formatSchoolYear } from '../../common/utils';

const AdminStudentsView = () => {
  const [studentList, setStudentList] = useState([]);
  const [error, setError] = useState(null);
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Site',
      headerPopover: '',
    },
    {
      headerTitle: 'Home Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'Ethnicity',
      headerPopover: '',
    },
    {
      headerTitle: 'Gender',
      headerPopover: '',
    },
    {
      headerTitle: 'Grade',
      headerPopover: '',
    },
    {
      headerTitle: 'Area',
      headerPopover: '',
    },
    {
      headerTitle: 'School Year/Cycle',
      headerPopover: '',
    },
    {
      headerTitle: 'View Profile',
      headerPopover: '',
    },
  ];

  const formatEthnicity = ethnicity => {
    let eth = '';
    if (ethnicity) {
      ethnicity.forEach(e => {
        eth += `${capitalize(e)}, `;
      });
    } else {
      eth = 'Non-specified, ';
    }
    return eth.slice(0, -2);
  };

  const formatSiteInfo = (siteName, areaName, year, cycle) => {
    const site = siteName || 'No assigned site';
    const area = areaName || 'Np assigned area';
    let schoolYearAndCycle = year ? formatSchoolYear(year) : 'N/A';
    schoolYearAndCycle = cycle ? `${schoolYearAndCycle}/Cycle ${cycle}` : 'N/A';

    return [site, area, schoolYearAndCycle];
  };

  useEffect(async () => {
    const res = await TLPBackend.get(`/students`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      setStudentList(res.data);
    } else {
      setStudentList([]);
      setError(error);
    }
  }, []);

  const tbodyData = [];
  studentList.forEach(studentObj => {
    const {
      firstName,
      lastName,
      siteName,
      ethnicity,
      areaName,
      year,
      cycle,
      homeTeacher,
      gender,
      grade,
    } = studentObj;
    const eth = formatEthnicity(ethnicity);
    const [site, area, schoolYearAndCycle] = formatSiteInfo(siteName, areaName, year, cycle);
    const ht = homeTeacher || 'Not recorded';
    tbodyData.push({
      id: studentObj.userId,
      items: [
        `${lastName}, ${firstName}`,
        site,
        ht,
        eth,
        gender,
        grade,
        area,
        schoolYearAndCycle,
        'View Scores',
      ],
    });
  });

  return (
    <div className={styles['student-container']}>
      <ManagementDataSection sectionTitle="Students" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default AdminStudentsView;
