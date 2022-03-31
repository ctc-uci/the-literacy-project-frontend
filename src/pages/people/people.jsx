import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styles from './people.module.css';
import AdminView from '../admin/admin';
import AdminStudentsView from '../admin-students-view/admin-students-view';
import MasterTeacherView from '../master-teachers/master-teachers';
import NavigationBar from '../../components/NavigationBar/NavigationBar';

const PeopleView = () => {
  return (
    <div className={styles['people-container']}>
      <NavigationBar />
      <Tabs defaultActiveKey="staff">
        <Tab eventKey="staff" title="Staff">
          <AdminView />
          <MasterTeacherView />
        </Tab>
        <Tab eventKey="students" title="Students">
          <AdminStudentsView />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PeopleView;
