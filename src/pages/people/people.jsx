import React from 'react';
import './people.css';
import { Tabs, Tab } from 'react-bootstrap';
import AdminView from '../admin/admin';
import MasterTeacherView from '../master-teachers/master-teachers';
import NavigationBarTwo from '../../components/NavigationBarTwo/NavigationBarTwo';

const PeopleView = () => {
  return (
    <div className="people-container">
      <NavigationBarTwo />
      <Tabs defaultActiveKey="staff">
        <Tab eventKey="staff" title="Staff">
          <AdminView />
          <MasterTeacherView />
        </Tab>
        <Tab eventKey="students" title="Students">
          stuff will go here soon
        </Tab>
      </Tabs>
    </div>
  );
};

export default PeopleView;
