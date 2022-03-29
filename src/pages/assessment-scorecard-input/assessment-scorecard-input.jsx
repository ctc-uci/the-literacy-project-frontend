import React from 'react';
import AssessmentScoreCard from '../../components/AssessmentCard/AssessmentScoreCard';

const AssessmentScorecardInput = () => {
  return (
    <div>
      <AssessmentScoreCard name="pretestA" />
      <AssessmentScoreCard name="posttestA" />
    </div>
  );
};

export default AssessmentScorecardInput;
