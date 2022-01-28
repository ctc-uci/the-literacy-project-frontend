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
      headerTitle: 'Teacher',
      headerPopover: '',
    },
    {
      headerTitle: 'School',
      headerPopover: '',
    },
    {
      headerTitle: 'District',
      headerPopover: '',
    },
    {
      headerTitle: 'Cycle',
      headerPopover: '',
    },
    {
      headerTitle: 'Scores',
      headerPopover: '',
    },
  ];
  const tbodyData = [
    {
      id: 1,
      items: [
        'Test Name',
        'Test Teacher',
        'Test School',
        'Test District',
        '2020-Cycle 1',
        'View Score btn',
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
