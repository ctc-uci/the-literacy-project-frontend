import React from 'react';
import './teachers.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const TeacherView = () => {
  const theadData = ['Name', 'Email', 'Schools', 'District', 'Status'];
  const tbodyData = [
    {
      id: 1,
      items: ['Test Name', 'test@email.com', 'Test School', 'Test District', 'Active'],
    },
  ];
  return (
    <div>
      <ManagementDataSection sectionTitle="Teachers" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default TeacherView;
