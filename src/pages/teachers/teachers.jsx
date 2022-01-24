import React from 'react';
import './teachers.css';
import CreationPageTabs from '../../components/CreationPageTabs/CreationPageTabs';
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
      <CreationPageTabs currentActiveTab="/teachers" />
      <ManagementDataSection sectionTitle="Teachers" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default TeacherView;
