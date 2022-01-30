import React from 'react';
import './admin.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const AdminView = () => {
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Email',
      headerPopover: '',
    },
    {
      headerTitle: 'Status',
      headerPopover:
        "<p><strong style='color:#28a745'>Active:</strong> This user is active in the current cycle. They have full access and can log in.</p> <p><strong style='color:#5f758d'>Inactive:</strong> This user is inactive in the current cycle. They cannot log in until an admin user reactivates their account.</p> <p><strong style='color:#17a2b8'>Email Sent:</strong> An email sign up link was sent. They have not set up their account yet.",
    },
  ];
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
    <div className="admin-container">
      <ManagementDataSection sectionTitle="Admin" theadData={theadData} tbodyData={tbodyData} />
    </div>
  );
};

export default AdminView;
