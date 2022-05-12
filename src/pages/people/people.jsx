import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styles from './people.module.css';
import AdminView from '../admin/admin';
import AdminStudentsView from '../admin-students-view/admin-students-view';
import MasterTeacherTableView from '../master-teachers-table/master-teachers-table';

const PeopleView = () => {
  return (
    <div className={styles['people-container']}>
      <div className={styles.header}>
        <h1>People</h1>
      </div>
      <Tabs defaultActiveKey="staff">
        <Tab eventKey="staff" title="Staff">
          <AdminView />
          <MasterTeacherTableView />
        </Tab>
        <Tab eventKey="students" title="Students">
          <AdminStudentsView />
        </Tab>
      </Tabs>
    </div>
  );
};

export default PeopleView;
