import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import styles from './people.module.css';
import AdminView from '../admin/admin';
import AdminStudentsView from '../admin-students-view/admin-students-view';
import MasterTeacherTableView from '../master-teachers-table/master-teachers-table';
import CommonAlert from '../../common/CommonAlert/CommonAlert';

const PeopleView = () => {
  const [alertState, setAlertState] = useState({
    variant: 'success',
    message: '', // alert is used for resending email, resetting password, and updating notes
    open: false,
  });

  return (
    <div className={styles['people-container']}>
      <h2 className={styles['page-title']}>People</h2>
      <Tabs defaultActiveKey="staff">
        <Tab eventKey="staff" title="Staff">
          <AdminView setAlertState={setAlertState} />
          <MasterTeacherTableView setAlertState={setAlertState} />
        </Tab>
        <Tab eventKey="students" title="Students">
          <AdminStudentsView />
        </Tab>
      </Tabs>
      <CommonAlert
        variant={alertState.variant}
        open={alertState.open}
        setOpen={val => setAlertState({ ...alertState, open: val })}
      >
        {alertState.message}
      </CommonAlert>
    </div>
  );
};

export default PeopleView;
