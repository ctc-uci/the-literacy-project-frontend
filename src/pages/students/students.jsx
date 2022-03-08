import './students.css';
import React from 'react';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const StudentView = () => {
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
      headerTitle: 'Ethnicity',
      headerPopover: '',
    },
    {
      headerTitle: 'District',
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
  const tbodyData = [
    {
      id: 1,
      items: [
        'Test Name',
        'Test Site',
        'Test Ethnicity',
        'Test District',
        'Test Cycle',
        'Test Profile',
      ],
    },
  ];
  return (
    <div className="student-container">
      <ManagementDataSection sectionTitle="Students" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default StudentView;
