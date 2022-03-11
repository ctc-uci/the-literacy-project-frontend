import './CreationPageTabs.css';
import React from 'react';
// import { Tabs, Tab } from 'react-bootstrap';
import SiteView from '../../pages/sites/sites';
// import AdminView from '../../pages/admin/admin';
// import TeacherView from '../../pages/master-teachers/master-teachers';
// import StudentView from '../../pages/students/students';
// import NavigationBar from '../NavigationBar/NavigationBar';

const CreationPageTabs = () => {
  return (
    <div>
      {/* <Tabs defaultActiveKey="sites">
        <Tab eventKey="sites" title="Sites"> */}
      <SiteView />
      {/* </Tab>
        <Tab eventKey="admin" title="Admin">
          <AdminView />
        </Tab>
        <Tab eventKey="teachers" title="Teachers">
          <TeacherView />
        </Tab>
        <Tab eventKey="students" title="Students">
          <StudentView />
        </Tab>
      </Tabs> */}
    </div>
  );
};

export default CreationPageTabs;
