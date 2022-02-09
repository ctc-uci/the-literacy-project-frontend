import React from 'react';
import './AttitudeForm.css';

import AttitudeScoreTable from './AttitudeScoreTable';

function AttitudeForm() {
  return (
    <div>
      <h2 style={{ textAlign: 'left', fontSize: '32px', margin: '5px' }}>
        Reading Attitude Survey
      </h2>

      {/* <form>
        <label htmlFor="studentName">
          Student Name:
          <input type="text" id="studentName" />
        </label>
        <label htmlFor="masterTeacher">
          Master Teacher:
          <input type="text" id="masterTeacher" />
        </label>
        <label htmlFor="grade">
          Grade:
          <input type="text" id="grade" />
        </label>
      </form> */}

      <AttitudeScoreTable tableName="Pre-Test Date:" />
      <AttitudeScoreTable tableName="Post-Test Date:" />
    </div>
  );
}

export default AttitudeForm;
