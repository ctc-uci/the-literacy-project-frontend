import React from 'react';
import './admin.css';
import CreationPageTabs from '../../components/CreationPageTabs/CreationPageTabs';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const AdminView = () => {
  const theadData = ['Name', 'Email', 'Status'];
  const tbodyData = [
    {
      id: 1,
      items: ['Test Name1', 'admin@admin.edu', 'Active'],
    },
    {
      id: 2,
      items: ['Test Name2', 'admin@admin.edu', 'Active'],
    },
    {
      id: 3,
      items: ['Test Name3', 'admin@admin.edu', 'Active'],
    },
  ];
  return (
    <div>
      <CreationPageTabs currentActiveTab="/admin" />
      <ManagementDataSection sectionTitle="Admin" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default AdminView;
