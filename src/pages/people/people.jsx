import React from 'react';
import './people.css';
import { Tabs, Tab } from 'react-bootstrap';
import ManagementDataSection from '../../components/ManagementDataSection/ManagementDataSection';
import AdminView from '../admin/admin';
import AdminStudentsView from '../admin-students-view/admin-students-view';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const PeopleView = () => {
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
      items: ['Test Name', 'test@email.com', 'Test School', 'Test District', 'Active'],
    },
  ];
  return (
    <div className="people-container">
      <NavigationBar />
      <Tabs defaultActiveKey="staff">
        <Tab eventKey="staff" title="Staff">
          <AdminView />
          <div className="master-teacher-container">
            <ManagementDataSection
              sectionTitle="Master Teacher"
              theadData={theadData}
              tbodyData={tbodyData}
            />
          </div>
        </Tab>
        <Tab eventKey="students" title="Students">
          <AdminStudentsView />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PeopleView;
