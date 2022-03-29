import React from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';

const AssessmentScorecardInput = () => {
  return (
    <div>
      <AssessmentScoreCard name="pretestA" headerText="Pre-Test" />
      <AssessmentScoreCard name="posttestA" headerText="Post-Test" />
    </div>
  );
};

export default AssessmentScorecardInput;
