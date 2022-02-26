import React from 'react';
import './master-teachers.css';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';

const MasterTeacherView = () => {
  const theadData = [
    {
      headerTitle: 'Name',
      headerPopover: '',
    },
    {
      headerTitle: 'Contact Information',
      headerPopover: '',
    },
    {
      headerTitle: 'Sites',
      headerPopover: '',
    },
    {
      headerTitle: 'Area',
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
      items: ['Test Name', 'test@email.com', 'Test School', 'Test Area', 'Active'],
    },
  ];
  return (
    <div className="master-teacher-container">
      <ManagementDataSection
        sectionTitle="Master Teachers"
        theadData={theadData}
        tbodyData={tbodyData}
        tbodyColIsBadge={[2]}
      />
    </div>
  );
};

export default MasterTeacherView;
