import React, { useState } from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';
import { TLPBackend } from '../../common/utils';

const AssessmentScorecardInput = () => {
  const [studentID, setStudentID] = useState(1);
  const [studentData, setStudentData] = useState({});

  const fetchStudentData = async () => {
    const res = await TLPBackend.get(`./students/${studentID}`);
    setStudentData(res.data);
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <p htmlFor="studentID">Temp - student id</p>
        <input
          name="studentID"
          onChange={e => setStudentID(Number(e.target.value))}
          type="number"
        />
        <button type="button" onClick={() => fetchStudentData()}>
          submit
        </button>
      </div>

      <AssessmentScoreCard studentData={studentData} name="pretestA" headerText="Pre-Test" />
      <AssessmentScoreCard studentData={studentData} name="posttestA" headerText="Post-Test" />
    </div>
  );
};

export default AssessmentScorecardInput;
