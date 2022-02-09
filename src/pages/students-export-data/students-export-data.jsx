import './students-export-data.css';
import React from 'react';

import AttitudeForm from '../../components/AttitudeForm/AttitudeForm';

const StudentsExportDataView = () => {
  return (
    <div>
      <h1 className="students-export-data-view">Students Export Data View</h1>

      {/*  TEMP CONTAINER TO SHOW ATTITUDE FORM */}
      <div style={{ width: '510px' }}>
        <AttitudeForm />
      </div>
    </div>
  );
};

export default StudentsExportDataView;
