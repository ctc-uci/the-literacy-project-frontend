import React from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';

const AssessmentScorecardInput = () => {
  // TODO: remove
  const studentID = 1;

  return (
    <div>
      <div>Temporarily reading data from student with ID: {studentID}</div>

      <AssessmentScoreCard studentID={studentID} name="pretestA" headerText="Pre-Test" />
      <AssessmentScoreCard studentID={studentID} name="posttestA" headerText="Post-Test" />
    </div>
  );
};

export default AssessmentScorecardInput;
