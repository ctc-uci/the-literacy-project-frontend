import './students.css';
import React from 'react';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const StudentView = () => {
  const theadData = ['Name', 'Teacher', 'School', 'District', 'Cycle', 'Scores'];
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
